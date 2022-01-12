using Bilhet.Domain.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Bilhet.API.Views.DTOs
{
    public class UsuarioDTO : BaseDTO
    {
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string CPF { get; set; }
        public int Fidelidade { get; set; } // 0 - Não está fidelizado // 1 - Está Fidelizado
        public int FidelidadePontuacao
        {
            get
            {
                var pontos = 0;
                foreach (var fidelidade in Fidelidades)
                {
                    if(fidelidade.Ativo)
                        pontos += fidelidade.Pontos;
                }
                return pontos;
            }
        }


        [JsonIgnore]
        public virtual ICollection<FidelidadeDTO> Fidelidades { get; set; } = new List<FidelidadeDTO>();
    }
}
