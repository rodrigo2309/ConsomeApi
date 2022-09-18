using ConsomeAPI.Models;
using Newtonsoft.Json;
using System.Text;
using XSystem.Security.Cryptography;

namespace ConsomeAPI.Services
{
    public class QueriesService
    {
        public List<Personagem> GetHero(string? nome)
        {
            if (nome != null) //|| nome.Any()
            {
                //nome = "Spider-Man (2099)";//3-D Man
                nome = "&name=" + nome;
            }

            List<Personagem> personagem = new List<Personagem>();

            using (HttpClient client = new HttpClient()) //client.BaseAddress = new System.Uri("http://gateway.marvel.com/v1/public/comics");
            {
                var ts = DateTime.Now;
                string data = ts.Day.ToString() + ts.Month.ToString() + ts.Year.ToString() + ts.Hour.ToString()
                    + ts.Minute.ToString() + ts.Second.ToString();

                string pubKey = "18c0d97575804f1c571bdfd6e5ae65e3";
                string priKey = "f17218c7a6c595a15cb7c1a522e0631b96adc8c1";
                string URL = "http://gateway.marvel.com/v1/public/characters?";

                string preHash = data + priKey + pubKey;

                string hash = GeraHash(preHash);

                string Uri = URL + "ts=" + data + "&apikey=" + pubKey + "&hash=" + hash + nome;

                HttpResponseMessage response = client.GetAsync(Uri).Result;

                response.EnsureSuccessStatusCode();

                string conteudo = response.Content.ReadAsStringAsync().Result;

                dynamic resultado = JsonConvert.DeserializeObject(conteudo);

                if (resultado.data.total > 0)
                {
                    foreach(var a in resultado.data.results)
                    {
                        personagem.Add(new Personagem()
                        {
                            id = a.id,
                            Description = a.description == "teste" ? "        " : a.description,
                            Nome = a.name,
                            URlImagem = a.thumbnail.path + "." + a.thumbnail.extension,
                            URlWiki = a.urls[1].url
                            //id = resultado.data.results[0].id,
                            //Description = resultado.data.results[0].description,
                            //Nome = resultado.data.results[0].name,
                            //URlImagem = resultado.data.results[0].thumbnail.path + "." + resultado.data.results[0].thumbnail.extension,
                            //URlWiki = resultado.data.results[0].urls[1].url
                        });
                    }
                }
            }
            return personagem;
        }

        static string GeraHash(string preHash)
        {
            byte[] tmpSource;
            byte[] tmpHash;

            //Create a byte array from source data.
            tmpSource = ASCIIEncoding.ASCII.GetBytes(preHash);

            //Compute hash based on source data.
            tmpHash = new MD5CryptoServiceProvider().ComputeHash(tmpSource);

            //byte[] arrInput;
            int i;
            StringBuilder sOutput = new StringBuilder(tmpHash.Length);
            for (i = 0; i < tmpHash.Length; i++)
            {
                sOutput.Append(tmpHash[i].ToString("X2"));
            }
            return sOutput.ToString().ToLower();
        }
    }
}
