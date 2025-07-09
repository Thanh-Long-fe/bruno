// AdminPage.tsx
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { createPerson, deletePerson, getPersons, updatePerson, updatePersonResult } from '../service/info';
import PreviewResult from '../components/Preview';
import MessagePopupButton from '../components/popup';
const modules = {
  toolbar: [
    [{ 'font': [] }, { 'size': [] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export interface Person {
  _id: string;
  code: string;
  fullName: string;
  birth: string;
  passportNumber: string;
  socialSecurity: string;
  phoneNumber: string;
  address: string;
  result: string;
  cardNumber?: string;
  status?: string;
  note?: string;
}

const schema = yup.object().shape({
  code: yup.string().required(),
  fullName: yup.string().required(),
  birth: yup.string().required(),
  passportNumber: yup.string().required(),
  socialSecurity: yup.string().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
  result: yup.string().required(),
  cardNumber: yup.string().required(),
  status: yup.string().required(),
  note: yup.string().required(),

});

const AdminPage = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     window.location.href = "/login"
  //   }
  // }, [])
  const [data, setData] = useState<Person[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);
  const [bulkResultModalOpen, setBulkResultModalOpen] = useState(false);
  const [bulkResult, setBulkResult] = useState('');


  const itemsPerPage = 10;

  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm<any>({ resolver: yupResolver(schema) });

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const res = await getPersons(currentPage, itemsPerPage);
      setData(res.data.docs);
    } catch (err) {
      console.error('Failed to fetch persons', err);
    }
  };

  const filtered = data?.filter((d) =>
    d.fullName.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure to delete this entry?')) {
      try {
        await deletePerson(id);
        await fetchData();
      } catch (err) {
        console.error('Failed to delete person:', err);
      }
    }
  };

  const onSubmit = async (formData: Person) => {
    try {
      if (editingPerson?._id) {
        await updatePerson(editingPerson._id, formData);
      } else {
        const { _id, ...createPayload } = formData;
        await createPerson(createPayload);
      }
      await fetchData();
      setModalOpen(false);
      setEditingPerson(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="text-center text-xl font-bold py-5 border-b border-slate-700">
          Admin CMS
        </div>
        <nav className="flex flex-col gap-2 px-4 py-6 text-sm">
          <a href="#" className="hover:bg-slate-700 px-3 py-2 rounded">Dashboard</a>
          <a href="#" className="bg-slate-700 px-3 py-2 rounded font-semibold">People</a>
          <a href="#" className="hover:bg-slate-700 px-3 py-2 rounded">Users</a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">People Management</h1>
          <div className="flex gap-2">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={() => setBulkResultModalOpen(true)}
            >
              Update All Results
            </button>
            <button
              className="bg-gradient-to-r from-teal-400 to-cyan-600 text-white px-4 py-2 rounded shadow hover:from-teal-500 hover:to-cyan-700"
              onClick={() => {
                const empty = {
                  _id: '', code: '', fullName: '', birth: '', passportNumber: '',
                  socialSecurity: '', phoneNumber: '', address: '', result: '',
                };
                setEditingPerson(empty);
                reset(empty);
                setModalOpen(true);
              }}
            >
              + Add Person
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <MessagePopupButton />
        </div>

        <div className="overflow-auto bg-white rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="p-3">Code</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Birth</th>
                <th className="p-3">Passport</th>
                <th className="p-3">Social Security</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Card Number</th>
                <th className="p-3">Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Note</th>
                <th className="p-3">Result</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((person, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-3">{person.code}</td>
                  <td className="p-3">{person.fullName}</td>
                  <td className="p-3">{person.birth}</td>
                  <td className="p-3">{person.passportNumber}</td>
                  <td className="p-3">{person.socialSecurity}</td>
                  <td className="p-3">{person.phoneNumber}</td>
                  <td className="p-3">{person.cardNumber}</td>
                  <td className="p-3">{person.address}</td>
                  <td className="p-3 text-blue-600">{person.status}</td>
                  <td className="p-3">{person.note}</td>

                  <td className="p-3">
                    <PreviewResult result={person.result} />
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => {
                        setEditingPerson(person);
                        reset(person);
                        setModalOpen(true);
                      }}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(person._id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-500">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: Math.ceil(filtered.length / itemsPerPage) }).map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === Math.ceil(filtered.length / itemsPerPage)}
            onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filtered.length / itemsPerPage), p + 1))}
            className="p-2 rounded disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {modalOpen && editingPerson && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-xl font-bold mb-4">{editingPerson._id ? 'Edit' : 'Add'} Person</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input className="border px-3 py-2 rounded w-full" placeholder="Code" {...register('code')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="Full Name" {...register('fullName')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="Birth" {...register('birth')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="Passport" {...register('passportNumber')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="SSN" {...register('socialSecurity')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="Phone" {...register('phoneNumber')} />
                  <input className="border px-3 py-2 rounded w-full" placeholder="Card Number" {...register('cardNumber')} />
                  <input className="border px-3 py-2 rounded w-full col-span-2" placeholder="Address" {...register('address')} />
                  <input className="border px-3 py-2 rounded w-full col-span-2" placeholder="Status" {...register('status')} />
                  <textarea className="border px-3 py-2 rounded w-full col-span-2" placeholder="Note" {...register('note')} />

                </div>
                <div>
                  <label className="font-semibold text-sm mb-1 block">Result</label>
                  <Controller
                    name="result"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill theme="snow" {...field}
                        modules={modules} />
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {bulkResultModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl">
              <h2 className="text-lg font-bold mb-3">Update Result for All People</h2>
              <ReactQuill theme="snow" value={bulkResult} onChange={setBulkResult} />
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => setBulkResultModalOpen(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
                <button
                  onClick={async () => {
                    try {
                      await updatePersonResult(bulkResult);
                      await fetchData();
                      setBulkResultModalOpen(false);
                      setBulkResult('');
                    } catch (err) {
                      console.error('Failed to update all results:', err);
                    }
                  }}
                  className="px-4 py-2 rounded bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;