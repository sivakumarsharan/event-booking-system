/**
 * Swagger API Documentation for Event Booking System
 * This file contains all Swagger/OpenAPI specifications separate from route logic
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: token
 *       description: JWT token stored in HTTP-only cookie
 * 
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated user ID
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *         isAdmin:
 *           type: boolean
 *           default: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - organizer
 *         - guests
 *         - address
 *         - city
 *         - date
 *         - time
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: Tech Conference 2026
 *         description:
 *           type: string
 *           example: Annual technology conference
 *         organizer:
 *           type: string
 *           example: TechCorp Inc.
 *         guests:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Jane Smith", "Bob Johnson"]
 *         address:
 *           type: string
 *           example: 123 Main Street
 *         city:
 *           type: string
 *           example: Colombo
 *         date:
 *           type: string
 *           format: date
 *           example: 2026-03-15
 *         time:
 *           type: string
 *           example: 09:00 AM
 *         media:
 *           type: array
 *           items:
 *             type: string
 *         tickets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: VIP
 *               price:
 *                 type: number
 *                 example: 150.00
 *               limit:
 *                 type: number
 *                 example: 50
 * 
 *     Booking:
 *       type: object
 *       required:
 *         - event
 *         - user
 *         - ticketType
 *         - ticketsCount
 *         - totalAmount
 *       properties:
 *         _id:
 *           type: string
 *         event:
 *           type: string
 *           description: Event ID reference
 *         user:
 *           type: string
 *           description: User ID reference
 *         ticketType:
 *           type: string
 *           example: VIP
 *         ticketsCount:
 *           type: number
 *           example: 2
 *         totalAmount:
 *           type: number
 *           example: 300.00
 *         paymentId:
 *           type: string
 *           example: BK-1234567890-ABC123
 *         status:
 *           type: string
 *           enum: [booked, confirmed, cancelled]
 *           default: booked
 *         createdAt:
 *           type: string
 *           format: date-time
 * 
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 * 
 *     Success:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           type: object
 */

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Users
 *     description: User management endpoints
 *   - name: Events
 *     description: Event management endpoints
 *   - name: Bookings
 *     description: Booking management endpoints
 *   - name: Reports
 *     description: Analytics and reporting endpoints
 */

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: SecurePass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /api/users/current-user:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/get-all-users:
 *   get:
 *     summary: Get all users (Admin)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /api/users/update-user/{id}:
 *   put:
 *     summary: Update user (Admin)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 */

/**
 * @swagger
 * /api/users/delete-user/{id}:
 *   delete:
 *     summary: Delete user (Admin)
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

// ============================================================================
// EVENT ROUTES
// ============================================================================

/**
 * @swagger
 * /api/events/upload-media:
 *   post:
 *     summary: Upload event media files
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /api/events/create-event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 */

/**
 * @swagger
 * /api/events/get-events:
 *   get:
 *     summary: Get all events with optional filters
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by event name
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date
 *     responses:
 *       200:
 *         description: List of events
 */

/**
 * @swagger
 * /api/events/get-event/{id}:
 *   get:
 *     summary: Get single event by ID
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 */

/**
 * @swagger
 * /api/events/edit-event/{id}:
 *   put:
 *     summary: Update event
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 */

/**
 * @swagger
 * /api/events/delete-event/{id}:
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */

// ============================================================================
// BOOKING ROUTES
// ============================================================================

/**
 * @swagger
 * /api/bookings/create-booking:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - event
 *               - ticketType
 *               - ticketsCount
 *               - totalAmount
 *             properties:
 *               event:
 *                 type: string
 *                 description: Event ID
 *               ticketType:
 *                 type: string
 *                 example: VIP
 *               ticketsCount:
 *                 type: number
 *                 example: 2
 *               totalAmount:
 *                 type: number
 *                 example: 300.00
 *     responses:
 *       201:
 *         description: Booking confirmed successfully
 */

/**
 * @swagger
 * /api/bookings/get-user-bookings:
 *   get:
 *     summary: Get current user's bookings
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 */

/**
 * @swagger
 * /api/bookings/get-all-bookings:
 *   get:
 *     summary: Get all bookings (Admin)
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 */

/**
 * @swagger
 * /api/bookings/get-booking/{id}:
 *   get:
 *     summary: Get single booking by ID
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 */

/**
 * @swagger
 * /api/bookings/cancel-booking/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 */

// ============================================================================
// REPORT ROUTES
// ============================================================================

/**
 * @swagger
 * /api/reports/revenue-analytics:
 *   get:
 *     summary: Get revenue analytics
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Revenue analytics data
 */

/**
 * @swagger
 * /api/reports/export-excel:
 *   get:
 *     summary: Export bookings to Excel
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Excel file
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /api/reports/export-pdf:
 *   get:
 *     summary: Export bookings to PDF
 *     tags: [Reports]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: eventId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */