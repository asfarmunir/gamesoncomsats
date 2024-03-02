import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { connectToDatabase } from "@/lib/database";
import { confirmPassword, hashPassword } from "@/lib/hashPass";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/database/models/user.model";

// const google_secret: string = process.env.GOOGLE_CLIENT_SECRET as string;
// const google_Id: string = process.env.GOOGLE_CLIENT_ID as string;
export const authOptions =   {
        session: {
            strategy: "jwt",
          },
        
          secret: "my-secret-123",
          providers: [
            CredentialsProvider({
              // The name to display on the sign in form (e.g. 'Sign in with...')
              name: "Credentials",
              id: "credentials",
              credentials: {
                email: {},
                username:{},
                password: {},
                role:{},
              },
              async authorize(credentials) {
                const { email, password, username, role  } = credentials 
        
                await connectToDatabase();
                const user = await User.findOne({ email });
                if (!user) {
                  try
                  {
                     const hashedPassword = await hashPassword(password);
                    const user = await User.create({
                      username,
                      email,
                      password: hashedPassword,
                      role,
                    });
                    console.log("user created: ",user)
                    return NextResponse.json({ message: "user created", user, status: 200 });
                  }
                  catch(e)
                  {
                    throw new Error("invalid Email or password");
                  }
                   
                }
        
                const isValid = await confirmPassword(password, user.password);
        
                if (!isValid) {
                  throw new Error("Wrong password");
                }
        
                return {
                  id: user._id,
                  email: user.email,
                  name: user.username,
                  role: user.role,
                };
              },
            }),
          ],
          callbacks: {
            async session({ session }) {
              await connectToDatabase();
              const userData = await User.findOne({
                email: session.user?.email,
              });
        
              session.user.id = userData?._id;
              session.user.firstName = userData?.firstName;
              session.user.lastName = userData?.lastName;
              session.user.role=userData.role;
        
              return session;
            },
          },
    }

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };