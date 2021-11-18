using Bilhet.Domain.Entities;
using System.Collections.Generic;

namespace Bilhet.API.Views.DTOs
{
    public class UsuarioDTO : BaseDTO
    {
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int Fidelidade { get; set; } // 0 - Não está fidelizado // 1 - Está Fidelizado

        public virtual ICollection<FidelidadeDTO> Fidelidades { get; set; } = new List<FidelidadeDTO>();
    }
}
