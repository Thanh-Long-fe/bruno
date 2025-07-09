import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/delay';
import { getResultByCode } from '../service/info';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Person } from '../page/AdminPage';

const CaseStatusChecker = () => {
    const [receipt, setReceipt] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [data, setData] = useState<Person | null>(null);
    const [a, setA] = useState(false);

    const handleCheckStatus = () => {
        setA(true)
    };
    const number = useDebounce(receipt, 300);
    useEffect(() => {
        const fetchData2 = async () => {
            if (!number.trim()) {
                setLoading(false)
                setError('');
                setA(false)
                setData(null)
                return
            }
            try {
                setLoading(true);
                const res = await getResultByCode(number.trim());
                setData(res?.data || null);
            } catch (error) {
                setError('Please enter an application receipt number.');
            }
            finally {
                setLoading(false)
            }
        }
        fetchData2()
    }, [number])

    return (
        <div className=" p-6 border rounded shadow bg-white my-4">
            {data && a ? <div dangerouslySetInnerHTML={{ __html: data.result }}
            ></div> :
                <>
                    <h1 className="text-2xl font-bold mb-4">Check Case Status</h1>

                    <p className="text-gray-800 mb-4">
                        Use this tool to track the status of an immigration application, petition, or request.
                    </p>

                    <p style={{ fontSize: "16px", fontWeight: "400" }} className="text-black mb-4 italic">
                        The receipt number is a unique 13-character identifier that consists of three letters and 10 numbers.
                        Omit dashes ("-") when entering a receipt number. However, you can include all other characters,
                        including asterisks ("*"), if they are listed on your notice as part of the receipt number.{' '}
                        <strong>
                            When a receipt number is entered, the "Check Status" button will be enabled and you can check the status.
                        </strong>
                    </p>
                </>}
            <div>
                {data && a && (
                    <div className='mt-6'>
                        <button
                            onClick={() => setShow(!show)}
                            className="flex justify-start gap-2 items-center w-full text-left text-blue-600 font-semibold"
                        >
                            <div>Case Information</div>
                            {show ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                    </div>
                )}

                {show && (
                    <div className="mt-4 text-sm text-gray-700 leading-6">
                        <p><strong>Status:</strong> <span className="text-blue-500">{data?.status || "none"}</span></p>
                        <p><strong>Full name:</strong> {data?.fullName}</p>
                        <p><strong>Date of birth:</strong> {data?.birth}</p>
                        <p><strong>Passport number:</strong>{data?.passportNumber}</p>
                        <p><strong>Green card number:</strong> {data?.cardNumber}</p>
                        <p><strong>Social Security Number:</strong> {data?.socialSecurity}</p>
                        <p><strong>Phone number:</strong>{data?.phoneNumber}</p>
                        <p><strong>Address:</strong>{data?.address}</p>
                    </div>
                )}
            </div>
            <div style={{
                borderLeft: error ? "10px solid red" : "none",
                width: "350px",
                padding: "10px 0",
                margin: "5px 0px",
            }}>

                <div className='px-2'> 
                    <label htmlFor="receipt" className="font-semibold block mb-1">

                        Enter a Receipt Number
                    </label>
                    {error && <p className="text-red-600 font-semibold mb-1">Error: {localStorage.getItem("errorMessage") || "Please enter an application receipt number"}</p>}
                </div>
            </div>

            <input
                id="receipt"
                type="text"
                value={receipt}
                onChange={(e) => {
                    setReceipt(e.target.value.trim())
                    setError('');
                    setA(false)
                    setData(null)
                    setShow(false)
                }}
                placeholder="EAC1234567890"
                className={`border ${error ? 'border-red-600' : 'border-gray-300'
                    } w-[200px] px-3 py-2 mb-4`}
            />
            <div>

                <button
                    disabled={!data || loading}
                    onClick={handleCheckStatus}
                    className={`px-4 py-2 text-white font-semibold rounded ${!data || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Check Status
                </button>
            </div>
            <div className="mt-6 text-sm">
                <p>
                    Already have an Account?{' '}
                    <a href="/" className="text-blue-600 hover:underline">
                        Login
                    </a>
                </p>
                <p>
                    Create an Account?{' '}
                    <a href="/" className="text-blue-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default CaseStatusChecker;
