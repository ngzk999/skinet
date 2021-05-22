using Core.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdWithSpecification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdWithSpecification(string paymentIntentId) : base (o => o.PaymentIntentId == paymentIntentId)
        {
            
        }
    }
}