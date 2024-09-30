export const DeleteModal = () = >{
    
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this entry?</p>
        <div className="flex justify-end gap-4">
          <button
            className="p-2 bg-gray-300 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-red-600 text-white rounded"
            onClick={handleDeleteEntry}
          >
            Delete
          </button>
        </div>
      </div>
    </div>;

}
