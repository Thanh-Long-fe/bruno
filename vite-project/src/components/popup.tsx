import { useEffect, useState } from 'react';
export const errorMessage = () =>  localStorage.getItem("errorMessage") || "Please enter an application receipt number"

const MessagePopupButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        if (isOpen) {
            setMessage(localStorage.getItem("errorMessage") || "Please enter an application receipt number")
        }
    }, [isOpen])

    const handleSave = () => {
        if (!message.trim()) {
            setError('Message cannot be empty.');
            return;
        }

        localStorage.setItem('errorMessage', message);
        setError('');
        setIsOpen(false);
        alert('Message saved to localStorage!');
    };

    return (
        <div className="relative">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setIsOpen(true)}
            >
                Edit error message
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold mb-4">Enter Message</h2>

                        <input
                            type="text"
                            className="w-full border border-gray-300 p-2 rounded mb-2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your message"
                        />

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessagePopupButton;
