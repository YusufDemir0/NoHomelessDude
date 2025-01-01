import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("SqliteDb");

export const createTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Users (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          name TEXT, 
          email TEXT, 
          password TEXT, 
          foto TEXT
        );`,
        [],
        () => console.log("Users table created successfully"),
        (tx, error) => {
          console.log("Error creating Users table:", error);
          return false;
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS Posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          user_id INTEGER, 
          name TEXT, 
          aciklama TEXT, 
          liste TEXT, 
          konum TEXT,
          FOREIGN KEY(user_id) REFERENCES Users(id)
        );`,
        [],
        () => console.log("Posts table created or updated successfully"),
        (tx, error) => {
          console.log("Error creating or updating Posts table:", error);
          return false;
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
    }
  );
};

// Kullanıcı ekliyoruz
export const addUser = (name, email, password, foto) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO Users (name, email, password, foto) VALUES (?, ?, ?, ?);`,
        [name, email, password, foto],
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

export const getUser = (email, password, callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM Users WHERE email = ? AND password = ?;`,
        [email, password],
        (tx, results) => {
          if (results.rows.length > 0) {
            callback(results.rows._array);
          } else {
            console.log("User not found");
            callback([]);
          }
        },
        (tx, error) => {
          console.log("Error fetching user:", error);
          callback([]);
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
      callback([]);
    }
  );
};

export const addPost = (user_id, name, aciklama, liste, konum) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO Posts (user_id, name, aciklama, liste, konum) VALUES (?, ?, ?, ?, ?);`,
        [user_id, name, aciklama, liste, konum],
        () => console.log("Post added successfully"),
        (tx, error) => {
          console.log("Error adding post:", error);
          return false;
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
    }
  );
};

export const getPosts = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `SELECT * FROM Posts;`,
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            callback(results.rows._array);
          } else {
            console.log("No posts found");
            callback([]);
          }
        },
        (tx, error) => {
          console.log("Error fetching posts:", error);
          callback([]);
        }
      );
    },
    (error) => {
      console.log("Transaction error:", error);
      callback([]);
    }
  );
};
