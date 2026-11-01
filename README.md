# Docker лабораторийн ажил – Node.js ба MySQL

## 1. Төслийн танилцуулга

Энэхүү лабораторийн ажлын хүрээнд Node.js болон Express.js ашиглан веб application хөгжүүлж, Docker ашиглан container болгон ажиллуулсан.

Мөн MySQL өгөгдлийн сантай холболт үүсгэж, Docker Compose ашиглан application болон database-ийг тусдаа container дээр зэрэг ажиллуулсан.

## 2. Ашигласан технологи

- **Node.js 24** – JavaScript ажиллуулах орчин
- **Express.js** – Веб application хөгжүүлэх framework
- **MySQL 8.4** – Харилцан хамааралтай өгөгдөл хадгалах өгөгдлийн сан
- **Docker** – Application-ийг container болгон ажиллуулах технологи
- **Docker Compose** – Олон container-ийг удирдах хэрэгсэл

## 3. Төслийн бүтэц

```text
docker-lab/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## 4. Application-ийн боломжууд

Application нь дараах гурван endpoint-тэй.

| Endpoint  | Үүрэг                                     |
| --------- | ----------------------------------------- |
| `/`       | Нүүр хуудас харуулах                      |
| `/health` | Application ажиллаж байгаа эсэхийг шалгах |
| `/db`     | MySQL өгөгдлийн сантай холболт шалгах     |

## 5. Ажиллуулах заавар

### 5.1. Repository-г татаж авах

```bash
git clone <GITHUB_REPOSITORY_URL>
cd docker-lab
```

### 5.2. Docker container үүсгэж ажиллуулах

```bash
docker compose up --build -d
```

Энэ команд нь:

- Node.js application-ийн Docker image үүсгэнэ.
- MySQL image татаж авна.
- Application болон MySQL container үүсгэнэ.
- Хоёр container-ийг ажиллуулна.

### 5.3. Container-ийн төлөв шалгах

```bash
docker compose ps
```

Application болон database container ажиллаж байгаа эсэхийг шалгана. MySQL container-ийн төлөв `healthy` байх ёстой.

### 5.4. Application нээх

Browser дээр дараах хаягуудаар хандана.

- Нүүр хуудас: http://localhost:3000/
- Application-ийн төлөв: http://localhost:3000/health
- Database холболт: http://localhost:3000/db

### 5.5. Application-ийн log шалгах

```bash
docker compose logs app
```

### 5.6. Container-уудыг зогсоох

```bash
docker compose down
```

Энэ команд container болон network-ийг устгах боловч MySQL-ийн named volume дахь өгөгдлийг хадгална.

## 6. Өгөгдлийн сангийн тохиргоо

MySQL өгөгдлийн санг `docker-compose.yml` файлд тохируулсан бөгөөд Docker Compose ажиллах үед автоматаар үүсгэнэ.

| Тохиргоо              | Утга                 |
| --------------------- | -------------------- |
| Өгөгдлийн сангийн нэр | `dockerlab_db`       |
| Хэрэглэгчийн нэр      | `dockerlab`          |
| Хэрэглэгчийн нууц үг  | `dockerlab_password` |
| Root нууц үг          | `root_password`      |
| Порт                  | `3306`               |

**Тайлбар:** Дээрх нууц үгүүд нь зөвхөн лабораторийн ажлын жишээ тохиргоо болно. Бодит системд илүү найдвартай нууц үг ашиглах шаардлагатай.

## 7. Docker Layer Caching

Dockerfile-ийг build хийх хугацааг багасгах зорилгоор layer caching ашиглан зохион байгуулсан.

Build хийх дараалал:

1. `package.json`, `package-lock.json` файлуудыг container руу хуулна.
2. `npm ci` командаар шаардлагатай сангуудыг суулгана.
3. Application-ийн эх код болох `app.js` файлыг хуулна.

Ингэснээр зөвхөн `app.js` файл өөрчлөгдсөн тохиолдолд өмнө үүссэн dependency layer-ийг дахин ашиглаж, сангуудыг дахин суулгах шаардлагагүй болно.

Build хийх команд:

```bash
docker compose --progress plain build app
```

Build-ийн үр дүнд өөрчлөгдөөгүй layer-үүд `CACHED` төлөвтэй харагдана.

## 8. Git тохиргоо

`.gitignore` файлд Git repository-д оруулах шаардлагагүй дараах файлуудыг зааж өгсөн.

- `node_modules/`
- `.env`
- `.env.*`
- `npm-debug.log*`

Шаардлагатай сангуудыг дахин суулгахдаа:

```bash
npm ci
```

командыг ашиглана.

## 9. Дүгнэлт

Энэхүү лабораторийн ажлаар Node.js application-ийг Docker ашиглан container болгон ажиллуулах, MySQL өгөгдлийн сантай холболт үүсгэх, Docker Compose ашиглан олон container-ийг удирдах үндсэн ойлголтуудыг хэрэгжүүлсэн.

Мөн Docker Layer Caching ашигласнаар application-ийн эх код өөрчлөгдөх үед өмнөх dependency layer-үүдийг дахин ашиглаж, build хийх хугацааг багасгах боломжтойг туршиж үзсэн.
