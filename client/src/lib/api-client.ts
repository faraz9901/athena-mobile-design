import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'athena-db';
const DB_VERSION = 1;

const STORE_USERS = 'users';
const STORE_SESSION = 'session';

/* =======================
   Types
======================= */

export interface User {
    id: string;
    phone: string;
    email?: string;
    name?: string;
    occupation?: string;
    onboardingCompleted: boolean;
    createdAt: number;
}

interface Session {
    key: 'current';
    token: string;
    userId: string;
    expiry: number;
}

/* =======================
   API
======================= */

export const api = {
    dbPromise: null as Promise<IDBPDatabase> | null,

    async getDB() {
        if (!this.dbPromise) {
            this.dbPromise = openDB(DB_NAME, DB_VERSION, {
                upgrade(db) {
                    /* Users store */
                    if (!db.objectStoreNames.contains(STORE_USERS)) {
                        const userStore = db.createObjectStore(STORE_USERS, {
                            keyPath: 'id',
                        });
                        userStore.createIndex('phone', 'phone', { unique: true });
                    }

                    /* Session store (single current session) */
                    if (!db.objectStoreNames.contains(STORE_SESSION)) {
                        db.createObjectStore(STORE_SESSION, {
                            keyPath: 'key',
                        });
                    }
                },
            });
        }
        return this.dbPromise;
    },

    auth: {
        /* =======================
           OTP (Mock)
        ======================= */

        async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
            await new Promise((r) => setTimeout(r, 800));
            console.log(`[Mock API] OTP sent to ${phone}: 123456`);
            return { success: true, message: 'OTP sent successfully' };
        },

        async verifyOtp(
            phone: string,
            otp: string
        ): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
            await new Promise((r) => setTimeout(r, 800));

            if (otp !== '123456') {
                return { success: false, error: 'Invalid OTP' };
            }

            const db = await api.getDB();

            /* Find or create user */
            let user = await db.getFromIndex(STORE_USERS, 'phone', phone);

            if (!user) {
                user = {
                    id: crypto.randomUUID(),
                    phone,
                    onboardingCompleted: false,
                    createdAt: Date.now(),
                };
                await db.put(STORE_USERS, user);
            }

            /* Create / overwrite current session */
            const token = crypto.randomUUID();

            const session: Session = {
                key: 'current',
                token,
                userId: user.id,
                expiry: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
            };

            await db.put(STORE_SESSION, session);

            return { success: true, user, token };
        },

        /* =======================
           Session helpers
        ======================= */

        async getCurrentUser(): Promise<User | null> {
            const db = await api.getDB();

            const session = (await db.get(
                STORE_SESSION,
                'current'
            )) as Session | undefined;

            if (!session || session.expiry < Date.now()) {
                await db.delete(STORE_SESSION, 'current');
                return null;
            }

            const user = await db.get(STORE_USERS, session.userId);
            return user ?? null;
        },

        async logout(): Promise<void> {
            const db = await api.getDB();
            await db.delete(STORE_SESSION, 'current');
        },

        /* =======================
           User updates
        ======================= */

        async updateUser(userId: string, updates: Partial<User>): Promise<User> {
            const db = await api.getDB();
            const user = await db.get(STORE_USERS, userId);

            if (!user) {
                throw new Error('User not found');
            }

            const updatedUser: User = {
                ...user,
                ...updates,
            };

            await db.put(STORE_USERS, updatedUser);
            return updatedUser;
        },
    },
};
