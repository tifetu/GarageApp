export const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/order/${orderId}`).then((res) => setOrder(res.data.data));
  }, [orderId]);

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order #{order.order_id}</h2>
      <p className="mb-2 font-medium">
        Customer: {order.customer_first_name} {order.customer_last_name}
      </p>
      <p className="mb-2">
        Vehicle: {order.vehicle_make} {order.vehicle_model} (
        {order.vehicle_year})
      </p>
      <p className="mb-2">
        Employee: {order.employee_first_name} {order.employee_last_name}
      </p>
      <p className="mb-4">Total Price: ${order.order_total_price}</p>

      <h3 className="text-lg font-semibold mb-2">Services</h3>
      <ul className="list-disc list-inside mb-4">
        {order.services.map((s, i) => (
          <li key={i}>
            {s.service_name} ({s.service_completed ? "Done" : "Pending"})
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-semibold mb-2">Status History</h3>
      <ul className="list-decimal list-inside">
        {order.status_history.map((s, i) => (
          <li key={i}>
            Status: {s.status} (ID: {s.order_status_id})
          </li>
        ))}
      </ul>
    </div>
  );
};
