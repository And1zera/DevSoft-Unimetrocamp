using System;

namespace Bilhet.Application.Utils
{
    public static partial class GeradorSenhas
    {
        public static string Gerar()
        {
            string chars = "ABCDEFGHJKMNPQRSTUVWXYZ0123456789";
            string pass = "";

            Random random = new Random();

            for (int f = 0; f < 6; f++)
            {
                pass = pass + chars.Substring(random.Next(0, chars.Length - 1), 1);
            }

            return pass;
        }
    }
}
/*
    obj.Senha = GeradorSenhas.Gerar();

    //Verifica se já existe senha
    var bilhetes = await _unitOfWork.EventoRepository.ListAllAsync();
    while (bilhetes.Any(e => e.Senha == obj.Senha))
    {
        obj.Senha = GeradorSenhas.Gerar();
    }
*/



