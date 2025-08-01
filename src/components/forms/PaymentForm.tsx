import { useState } from "react";
import { useCreatePayment } from "../../hooks/usePayments";

export function PaymentForm() {
  const createPayment = useCreatePayment();
  const [formData, setFormData] = useState({
    paymentId: "",
    amount: "",
    currency: "USD",
    recipientName: "",
    recipientAccountNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPayment.mutate({
      paymentId: formData.paymentId,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      recipientName: formData.recipientName,
      recipientAccountNumber: formData.recipientAccountNumber,
    });
    setFormData({
      paymentId: "",
      amount: "",
      currency: "USD",
      recipientName: "",
      recipientAccountNumber: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Submit New Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment ID
            </label>
            <input
              type="text"
              value={formData.paymentId}
              onChange={(e) =>
                setFormData({ ...formData, paymentId: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter payment ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              value={formData.recipientName}
              onChange={(e) =>
                setFormData({ ...formData, recipientName: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter recipient name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Account Number
          </label>
          <input
            type="text"
            value={formData.recipientAccountNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                recipientAccountNumber: e.target.value,
              })
            }
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Enter account number"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={createPayment.isPending}
            className="btn-primary"
          >
            {createPayment.isPending ? "Submitting..." : "Submit Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
