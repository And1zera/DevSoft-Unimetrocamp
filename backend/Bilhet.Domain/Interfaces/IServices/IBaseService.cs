using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Domain.Interfaces.Services
{

    public interface IBaseService<T> where T : BaseEntity
    {

        Task<IEnumerable<T>> ListAllAsync();
        Task<IEnumerable<T>> ListAsync(Expression<Func<T, bool>> spec);
        Task<T> GetByIdAsync(Guid id);
        Task<T> GetBySpecAsync(Expression<Func<T, bool>> spec);
        T Create(T obj);
        Task<bool> UpdateAsync(T obj);
        Task<bool> Inactivate(Guid id, Guid usuarioIdAlteracao);

    }

}