using Bilhet.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Bilhet.Domain.Interfaces.IRepositories
{
    public interface IFidelidadeRepository
    {
        Fidelidade Add(Fidelidade entity);
        Task<List<Fidelidade>> ListAsync(Expression<Func<Fidelidade, bool>> spec);
        void Delete(Fidelidade entity);
    }
}
