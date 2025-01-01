import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import * as SQLite from "expo-sqlite";

// Veritabanını açıyoruz
const db = SQLite.openDatabase("SqliteDb");

// Rastgele isimler dizisi
const randomNames = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Emily White",
  "Michael Green",
  "Sophia Taylor",
  "David Wilson",
  "Olivia Lee",
];

export default function Home() {
  useEffect(() => {
    // Tabloyu yalnızca yoksa oluşturuyoruz
    db.transaction(
      (tx) => {
        // Users tablosunu oluşturma
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            name TEXT, 
            email TEXT, 
            password TEXT,
            foto TEXT
          );`,
          [],
          () => console.log("Users table created or already exists"),
          (tx, error) => console.error("Error creating Users table:", error)
        );

        // Posts tablosunu oluşturma
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
          () => console.log("Posts table created or already exists"),
          (tx, error) => console.error("Error creating Posts table:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  }, []);

  // Rastgele kullanıcı adı seçme fonksiyonu
  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    return randomNames[randomIndex];
  };

  // Kullanıcı ekleme fonksiyonu
  const addUser = () => {
    const name = getRandomName(); // Rastgele isim alıyoruz
    const email = `${name.toLowerCase().replace(" ", ".")}@example.com`; // E-posta oluşturuyoruz
    const password = "123456"; // Sabit bir şifre
    const foto = "https://example.com/photo.jpg"; // Sabit bir fotoğraf URL'si

    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO Users (name, email, password, foto) VALUES (?, ?, ?, ?);",
          [name, email, password, foto],
          (_, result) => {
            const userId = result.insertId; // Yeni eklenen kullanıcının ID'sini alıyoruz
            console.log("User added with ID:", userId);

            // Kullanıcı eklendikten sonra post eklemeyi sağlayalım
            addPost(userId); // `addPost` fonksiyonuna kullanıcı ID'sini gönderiyoruz
          },
          (tx, error) => console.error("Error adding user:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  // Post ekleme fonksiyonu (kullanıcı id ile ilişkilendirilmiş)
  const addPost = (userId) => {
    db.transaction(
      (tx) => {
        // Önce kullanıcı adını alıyoruz
        tx.executeSql(
          "SELECT name FROM Users WHERE id = ?;",
          [userId],
          (tx, result) => {
            if (result.rows.length > 0) {
              const userName = result.rows.item(0).name;

              // Kullanıcı adını alındıktan sonra Post ekliyoruz
              tx.executeSql(
                "INSERT INTO Posts (user_id, name, aciklama, liste, konum) VALUES (?, ?, ?, ?, ?);",
                [
                  userId,
                  userName, // Kullanıcı adı burada ekleniyor
                  "Sample Description",
                  "Sample List",
                  "Sample Location",
                ],
                () => console.log("Post added successfully"),
                (tx, error) => console.error("Error adding post:", error)
              );
            } else {
              console.error("User not found for the provided ID:", userId);
            }
          },
          (tx, error) => console.error("Error fetching user name:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  // Kullanıcıları okuma fonksiyonu
  const readUsers = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM Users;",
          [],
          (tx, results) => {
            const rows = results.rows._array;
            console.log("Users in table:", rows);
            rows.forEach((user) => {
              console.log(
                `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Password: ${user.password}, Foto: ${user.foto}`
              );
            });
          },
          (tx, error) => console.error("Error reading users:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  // Postları okuma fonksiyonu
  const readPosts = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM Posts;",
          [],
          (tx, results) => {
            const rows = results.rows._array;
            console.log("Posts in table:", rows);
            rows.forEach((post) => {
              console.log(
                `ID: ${post.id}, User ID: ${post.user_id}, Name: ${post.name}, Description: ${post.aciklama}, List: ${post.liste}, Location: ${post.konum}`
              );
            });
          },
          (tx, error) => console.error("Error reading posts:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  // Kullanıcıları silme fonksiyonu
  const deleteUsers = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Users;",
          [],
          () => console.log("All users deleted successfully"),
          (tx, error) => console.error("Error deleting users:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  // Postları silme fonksiyonu
  const deletePosts = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "DELETE FROM Posts;",
          [],
          () => console.log("All posts deleted successfully"),
          (tx, error) => console.error("Error deleting posts:", error)
        );
      },
      (error) => console.error("Transaction error:", error)
    );
  };

  return (
    <View style={styles.container}>
      {/* User Table Operations */}
      <Button title="Add User" onPress={addUser} />
      <Button title="Read Users" onPress={readUsers} />
      <Button title="Delete All Users" onPress={deleteUsers} />

      {/* Post Table Operations */}
      <Button title="Add Post" onPress={() => addPost(1)} />
      <Button title="Read Posts" onPress={readPosts} />
      <Button title="Delete All Posts" onPress={deletePosts} />

      <Text>React Native SQLite</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
});
