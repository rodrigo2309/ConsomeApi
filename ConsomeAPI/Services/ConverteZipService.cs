using System.IO.Compression;
using System.Text;

namespace ConsomeAPI.Services
{
    public class ConverteZipService
    {
        public List<string> Converte(List<string> list)
        {
            byte[] r1 = Zip(list);

            var r2 = Convert.ToBase64String(r1);

            return Parse(r2);
        }

        public static void CopyTo(Stream src, Stream dest)
        {
            byte[] bytes = new byte[4096];

            int cnt;

            while ((cnt = src.Read(bytes, 0, bytes.Length)) != 0)
            {
                dest.Write(bytes, 0, cnt);
            }
        }

        public static byte[] Zip(List<string> str)
        {
            var bytes = str.SelectMany(a => Encoding.UTF8.GetBytes(a)).ToArray();

            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(mso, CompressionMode.Compress))
                {
                    //msi.CopyTo(gs);
                    CopyTo(msi, gs);
                }

                return mso.ToArray();
            }
        }

        public static byte[] Unzip(byte[] bytes)
        {
            using (var msi = new MemoryStream(bytes))
            using (var mso = new MemoryStream())
            {
                using (var gs = new GZipStream(msi, CompressionMode.Decompress))
                {
                    //gs.CopyTo(mso);
                    CopyTo(gs, mso);
                }

                return mso.ToArray();
            }
        }

        public static List<string> Parse(string msisdnfileBase64)
        {
            List<string> response = new List<string>();

            byte[] bytes = Convert.FromBase64String(msisdnfileBase64);

            var a = Unzip(bytes);

            using (MemoryStream file = new MemoryStream(a))
            using (BufferedStream bs = new BufferedStream(file))
            using (StreamReader reader = new StreamReader(file))
            {
                string line = string.Empty;
                while (reader.Peek() >= 0)
                {
                    line = reader.ReadLine().Trim();

                    response.Add(line);
                }
            }

            return response.Distinct().ToList();
        }
    }
}
