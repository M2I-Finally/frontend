package repository.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

//final pour eviter l'heritage
public final class DBManager {
	
	private String identifiant = "test";
	private String password = "password";
	private String serveur = "jdbc:postgresql://localhost/finally";
    private static DBManager instance;
    private Connection conn;

    //on cache le constructeur pour que ce soit l'objet qui se construit
    private DBManager() {
    	try {
			Class.forName("org.postgresql.Driver");
		}catch(ClassNotFoundException e) {
			System.out.println("le driver n'a pas été trouvé !!!!");
			System.exit(1);
		}
		
		try {
			conn = DriverManager.getConnection(serveur,identifiant, password);
			System.out.println("ok connecter");
									
		}
		catch (SQLException e) {
			System.out.println("pas connecter");
			System.out.println(e.getMessage());
		}
    }

    //le role de cette methode est de soit de creer une instance de la classe si
    //elle n'existe pas
    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }
    
    public PreparedStatement preparedStatement(String sql) throws SQLException {
    	return this.conn.prepareStatement(sql);
    }
    
    public void close() {
    	
    	try {
			this.conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }
}