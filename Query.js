-- ORDER BY;
SELECT * FROM passangers
ORDER BY Age DESC;

-- HAVING 
-- Hitung Jumlah Penumpang di Setiap Class
SELECT COUNT(*) as Total_Pclass, Pclass FROM passangers
GROUP BY Pclass
HAVING Total_Pclass > 175;

-- LIMIT & OFFSET
SELECT * FROM passangers
LIMIT 10; 

SELECT * FROM passangers
LIMIT 10 OFFSET 3; 

-- SUBQUERY ---> Query di Dalam Query
-- Mendapatkan Umur pria yang diatas rata-rata umur seluruh penumpang
SELECT * FROM passangers WHERE Sex = 'male' AND Age > 
(SELECT AVG(Age) FROM passangers);



EXERCISE
1. Ambil 1 Data Penumpang yang Memiliki Umur Paling Tua
SELECT * FROM passangers
ORDER BY Age DESC
LIMIT 1;

2. Hitung Total Penumpang yang Meninggal di Masing2 Class
SELECT COUNT(*) FROM passangers 
WHERE Survived = 0
GROUP BY Pclass;

3. Hitung Rata2 Tiket Masing2 Class 
SELECT AVG(Fare) as Total_Fare, Pclass FROM passangers
GROUP BY Pclass;

4. Ambil Data Penumpang yang Harga Tiketnya diatas Rata2 Harga Tiket Seluruh Penumpang
SELECT * FROM passangers WHERE Fare >
(SELECT AVG(Fare) From passangers);

5. Ambil Data Penumpang ke-5 yg Membayar Fare Paling Mahal 
SELECT * FROM passangers
ORDER BY Fare DESC
LIMIT 1 OFFSET 4;