using Bilhet.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace PerformaIT.GCAR.Domain.Interfaces.Repositories
{

    public interface IBaseRepository<T> : IDisposable where T : BaseEntity
    {

        T GetById(Guid id);
        Task<T> GetByIdAsync(Guid id);
        Task<T> GetByExpressionAsync(Expression<Func<T, bool>> spec);
        IEnumerable<T> ListAll();
        Task<List<T>> ListAllAsync();
        IEnumerable<T> ListAllTracking();
        Task<List<T>> ListAllTrackingAsync();
        IEnumerable<T> List(Expression<Func<T, bool>> spec);
        Task<List<T>> ListAsync(Expression<Func<T, bool>> spec);
        IEnumerable<T> ListTracking(Expression<Func<T, bool>> spec);
        Task<List<T>> ListTrackingAsync(Expression<Func<T, bool>> spec);
        T Add(T entity);
        void Update(T entity);
        void ActiveInactive(T entity);
        void Delete(T entity);

    }

}