import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'athena-db';
const DB_VERSION = 1;
const STORE_USERS = 'users';
const STORE_SESSION = 'session';

export interface User {
    id: string;
    phone: string;
    email?: string;
    name?: string;
    occupation?: string;
    onboardingCompleted: boolean;
    createdAt: number;
    // Add other fields from Full-flow.md as needed
}

interface Session {
    token: string;
    userId: string;
    expiry: number;
}

export const api = {
    dbPromise: null as Promise<IDBPDatabase> | null,

    async getDB() {
        if (!this.dbPromise) {
            this.dbPromise = openDB(DB_NAME, DB_VERSION, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains(STORE_USERS)) {
                        const userStore = db.createObjectStore(STORE_USERS, { keyPath: 'id' });
                        userStore.createIndex('phone', 'phone', { unique: true });
                    }
                    if (!db.objectStoreNames.contains(STORE_SESSION)) {
                        db.createObjectStore(STORE_SESSION, { keyPath: 'key' });
                    }
                },
            });
        }
        return this.dbPromise;
    },

    auth: {
        async sendOtp(phone: string): Promise<{ success: boolean; message: string }> {
            // simulate network delay
            await new Promise((resolve) => setTimeout(resolve, 800));
            console.log(`[Mock API] OTP sent to ${phone}: 123456`);
            return { success: true, message: 'OTP sent successfully' };
        },

        async verifyOtp(phone: string, otp: string): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
            await new Promise((resolve) => setTimeout(resolve, 800));

            if (otp !== '123456') {
                return { success: false, error: 'Invalid OTP' };
            }

            const db = await api.getDB();

            // Check if user exists
            const userFromIndex = await db.getFromIndex(STORE_USERS, 'phone', phone);

            let user: User;

            if (userFromIndex) {
                user = userFromIndex;
            } else {
                // Create new user (Partial registration until onboarding complete)
                user = {
                    id: crypto.randomUUID(),
                    phone,
                    onboardingCompleted: false,
                    createdAt: Date.now()
                };
                await db.put(STORE_USERS, user);
            }

            // Create session
            const token = crypto.randomUUID(); // Mock token
            const session: Session = {
                token,
                userId: user.id,
                expiry: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
            };

            // Save session 'current' key for easy access
            await db.put(STORE_SESSION, session, 'current');

            return { success: true, user, token };
        },

        async getCurrentUser(): Promise<User | null> {
            const db = await api.getDB();
            const session = await db.get(STORE_SESSION, 'current') as Session | undefined;

            if (!session || session.expiry < Date.now()) {
                return null;
            }

            const user = await db.get(STORE_USERS, session.userId);
            return user || null;
        },

        async logout(): Promise<void> {
            const db = await api.getDB();
            await db.delete(STORE_SESSION, 'current');
        },

        async updateUser(userId: string, updates: Partial<User>): Promise<User> {
            const db = await api.getDB();
            const user = await db.get(STORE_USERS, userId);
            if (!user) throw new Error("User not found");

            const updatedUser = { ...user, ...updates };
            await db.put(STORE_USERS, updatedUser);
            return updatedUser;
        }
    }
};
