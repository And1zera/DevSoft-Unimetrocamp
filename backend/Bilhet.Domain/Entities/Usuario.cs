using System.Collections.Generic;

namespace Bilhet.Domain.Entities
{
    public class Usuario : BaseEntity
    {
        public string Nome { get; set; }
        public string CPF { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int Fidelidade { get; set; } // 0 - Não está fidelizado // 1 - Está Fidelizado

        public virtual ICollection<Fidelidade> Fidelidades { get; set; } = new List<Fidelidade>();

    }
}
