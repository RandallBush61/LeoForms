using System;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

namespace LeoForms
{
    public class MySQLConnector
    {
        public static void Main()
        {
            string connStr = "server=database-1.cy1m3s5bdkpt.us-east-2.rds.amazonaws.com;port=3306;database=roaringdb;user=admin;password=DargonBallS051701";
            MySqlConnection conn = new MySqlConnection(connStr);
            conn.Open();
            string query = "select * from Users";
            MySqlCommand cmd = new MySqlCommand(query, conn);
            MySqlDataReader reader = cmd.ExecuteReader();
            while(reader.Read())
            {
                Console.WriteLine(reader["UserID"]);
                Console.WriteLine(reader["FirstName"]);
                Console.WriteLine(reader["LastName"]);
                Console.WriteLine(reader["Email"]);
            }


            conn.Close();
            Console.WriteLine("Done.");
       
        }
    }
}
