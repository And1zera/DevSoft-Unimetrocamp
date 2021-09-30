using System.Collections;

namespace Bilhet.API.ViewModel.Responses
{
    public abstract class Result
    {

        public string[] Errors { get; set; }

        public bool Success
        {
            get
            {
                return this.Errors == null;
            }
        }

    }

    public class GenericResult<T> : Result
    {

        public T Result { get; set; }

        public int Count
        {
            get
            {
                if (Result is IList list)
                {
                    return list.Count;
                }

                return Result != null ? 1 : 0;
            }
        }

    }
}
