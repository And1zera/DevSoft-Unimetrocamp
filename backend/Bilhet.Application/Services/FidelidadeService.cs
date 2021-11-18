using Bilhet.Domain.Interfaces.IRepositories;
using Bilhet.Domain.Interfaces.IServices;

namespace Bilhet.Application.Services
{
    public class FidelidadeService : IFidelidadeService
    {
        protected readonly IUnitOfWork _unitOfWork;

        public FidelidadeService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
    }
}
