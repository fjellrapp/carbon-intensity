type Props = {
  /** The title of the dialog */
  title: string;
  /** The children of the dialog */
  children: React.ReactNode;
  /** A test id for testing */
  testid?: string;
  /** The onClose handler for the dialog */
  onClose: () => void;
};
/**
 *  Dialog component
 */
export default function Dialog({ title, children, testid, onClose }: Props) {
  return (
    <dialog
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      data-testid={testid}
    >
      <div className="relative z-50 w-full max-w-4xl p-6 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex items-center justify-between">
          <h2
            className="text-3xl font-medium text-gray-900"
            data-testid="modal-title"
          >
            {title}
          </h2>
          <button
            data-testid="modal-close-icon"
            className="font-bold text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              data-testid="modal-close-icon"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="py-8">{children}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            data-testid="modal-close-button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
