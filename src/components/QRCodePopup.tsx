import { useState } from 'react';
import QRCode from 'react-qr-code';

export const QRCodePopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUrl = window.location.href;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                {isOpen ? 'Hide QR Code' : 'Show QR Code'}
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-4">Scan this QR Code</h3>
                            <div className="p-4 bg-white rounded-lg">
                                <QRCode value={currentUrl} />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
