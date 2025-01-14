import React from "react";
import * as SQLite from "expo-sqlite";

// Veritabanı bağlantısını açıyoruz
const db = SQLite.openDatabase("SqliteDb");

// Tabloyu oluşturuyoruz
const createTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);`,
        [],
        () => console.log("Table created successfully"),
        (tx, error) => {
          console.log("Error creating table:", error);
          return false;
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
    }
  );
};

// Yeni bir kullanıcı ekliyoruz
const addUser = (name, email, password) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO Users (name, email, password) VALUES (?, ?, ?);`,
        [name, email, password],
        () => console.log("User added successfully"),
        (tx, error) => {
          console.log("Error adding user:", error);
          return false;
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
    }
  );
};

// Kullanıcıyı email ve şifre ile kontrol ediyoruz
const getUser = (email, password, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM Users WHERE email = ? AND password = ?;`,
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            callback(results.rows._array); // Kullanıcı bulunduysa callback fonksiyonunu çağırıyoruz
          } else {
            console.log("User not found");
            callback([]); // Kullanıcı bulunamazsa boş array döndürüyoruz
          }
        },
        (tx, error) => {
          console.log("Error fetching user:", error);
          callback([]); // Hata durumunda da boş array döndürüyoruz
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
      callback([]); // Hata durumunda da boş array döndürüyoruz
    }
  );
};

// React bileşeni oluşturuyoruz
const App = () => {
  React.useEffect(() => {
    createTable(); // Bileşen ilk yüklendiğinde tabloyu oluştur
  }, []);

  const handleAddUser = () => {
    addUser("John Doe", "john@example.com", "password123");
  };

  const handleGetUser = () => {
    getUser("john@example.com", "password123", (users) => {
      if (users.length > 0) {
        console.log("User found:", users);
      } else {
        console.log("No user found.");
      }
    });
  };
};

export default App;
