export const UpdateOrderStatus = ({ orderId }) => {
  const [status, setStatus] = useState(1);

  const updateStatus = async () => {
    try {
      await axios.patch(`/order/${orderId}/status`, { status });
      alert("Order status updated");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="mt-4">
      <select
        value={status}
        onChange={(e) => setStatus(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        <option value={1}>Created</option>
        <option value={2}>In Progress</option>
        <option value={3}>Completed</option>
        <option value={4}>Cancelled</option>
      </select>
      <button
        onClick={updateStatus}
        className="ml-2 bg-blue-600 text-white px-4 py-1 rounded"
      >
        Update
      </button>
    </div>
  );
};
