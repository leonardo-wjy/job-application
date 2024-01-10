/**
 * @swagger
 * tags:
 *  - name: User
 *    description: User
 *  - name: Form
 *    description: Form
 * 
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email for user
 *         nickname:
 *           type: string
 *           description: password for user
 *       example:
 *         email: test@gmail.com
 *         password: "123123"
 * 
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: email for user
 *         password:
 *           type: string
 *           description: password for user
 *       example:
 *         email: test@gmail.com
 *         password: "123123"
 * 
 *     SaveForm:
 *       type: object
 *       required:
 *         - posisi
 *         - nama
 *         - no_ktp
 *         - tempat_tanggal_lahir
 *         - agama
 *         - golongan_darah
 *         - status
 *         - alamat_ktp
 *         - alamat_tinggal
 *         - email
 *         - no_telp
 *         - orang_terdekat
 *         - skill
 *         - bersedia_penempatan
 *         - penghasilan_harapan
 *       properties:
 *         posisi:
 *           type: string
 *           description: posisi
 *         nama:
 *           type: string
 *           description: nama
 *         no_ktp:
 *           type: string
 *           description: nomor ktp
 *         tempat_tanggal_lahir:
 *           type: string
 *           description: tempat dan tanggal lahir
 *         agama:
 *           type: string
 *           description: 
 *         golongan_darah:
 *           type: string
 *           description: 
 *         status:
 *           type: string
 *           description: 
 *         alamat_ktp:
 *           type: string
 *           description: 
 *         alamat_tinggal:
 *           type: string
 *           description: 
 *         email:
 *           type: string
 *           description: 
 *         no_telp:
 *           type: string
 *           description: 
 *         orang_terdekat:
 *           type: string
 *           description:  
 *         skill:
 *           type: string
 *           description: 
 *         bersedia_penempatan:
 *           type: string
 *           description: 
 *         penghasilan_harapan:
 *           type: string
 *           description: 
 *       example:
 *         posisi: web developer
 *         nama: testing
 *         no_ktp: "2123212321232123"
 *         tempat_tanggal_lahir: Jakarta, 12 Mei 2000
 *         agama: Islam
 *         golongan_darah: A
 *         status: Belum Menikah
 *         alamat_ktp: Jalan A
 *         alamat_tinggal: Jalan A
 *         email: test@gmail.com
 *         no_telp: "082187171778"
 *         orang_terdekat: Frislly, 081717218282
 *         skill: "- Mampu menggunakan bahasa pemrograman PHP"
 *         bersedia_penempatan: Ya
 *         penghasilan_harapan: "9000000"
 * 
 * /user/login:
 *   post:
 *     tags:
 *      - User
 *     summary: User Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Success
 * 
 * /user/register:
 *   post:
 *     tags:
 *      - User
 *     summary: User Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: Success
 * 
 * /form/{id}:
 *   post:
 *     tags:
 *      - Form
 *     summary: Save Form
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaveForm'
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Success
 *
 * /form/id/{id}:
 *   get:
 *     tags:
 *      - Form
 *     summary: Get Form
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: integer
 *              required: true
 *     security:
 *       - access_token: []
 *     responses:
 *       200:
 *         description: Success
 * 
 * /form/all:
 *   get:
 *     tags:
 *      - Form
 *     summary: Get All Form
 *     parameters:
 *        - in: query
 *          name: search
 *          schema:
 *              type: string
 *        - in: query
 *          name: sort
 *          schema:
 *              type: string
 *              required: true
 *              example: createdAt
 *              description: createdAt
 *        - in: query
 *          name: sortType
 *          schema:
 *              type: string
 *              required: true
 *              example: DESC
 *              description: DESC
 *        - in: query
 *          name: pageSize
 *          schema:
 *              type: integer
 *              required: true
 *              example: 10
 *              description: 10
 *        - in: query
 *          name: currentPage
 *          schema:
 *              type: integer
 *              required: true
 *              example: 1
 *              description: 1
 *     security:
 *          - access_token: []
 *     responses:
 *       200:
 *         description: Success
 * 
 */