using System;

namespace Bilhet.Domain.Entities
{
    public class Fidelidade : BaseEntity
    {
        public string CPF { get; set; }
        public string Email { get; set; }
        public int Pontos { get; set; }

        public virtual Usuario Usuario { get; set; }
        public virtual Bilhete Bilhete { get; set; }
    }
}
