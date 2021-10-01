using System;

namespace Bilhet.Domain.Interfaces.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IEventoRepository EventoRepository { get; }
        IBilheteRepository BilheteRepository { get; }

        bool Commit();
    }
}
