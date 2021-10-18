using Bilhet.Domain.Entities;
using Bilhet.Domain.Interfaces.Services;
using System;
using System.Threading.Tasks;

namespace Bilhet.Domain.Interfaces.IServices
{
    public interface IBilheteService : IBaseService<Bilhete>
    {
        Task<bool> TrocarAsync(Bilhete obj);
        Task<Bilhete> CreateAsync(Bilhete obj);
        Task<bool> InactivateBySenha(string senha, Guid usuarioIdAlteracao);
    }
}
