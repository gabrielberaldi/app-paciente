namespace WebApplication1.Models
{
    public class PagedResult<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int Count { get; set; }
    }
}
