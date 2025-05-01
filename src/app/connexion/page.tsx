
import Header from '../../components/Header';
import Footer from '../../components/Footer';
// import LoginForm from '../../components/LoginForm';
import { auth, currentUser } from '@clerk/nextjs/server'
import { checkRole } from '../utils/roles';
import { redirect } from 'next/navigation';
import BlogPostForm from '@/components/FormActualite';
export default async function Connexion() {
    const user = await currentUser()
  const isAdmin = await checkRole('admin')
  console.log('isAdmin', isAdmin)
  return (
    <main>
      <Header />
      
        <div className="bg-blue-900 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Espace de connexion</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Connectez-vous avec votre numéro d'apogée pour accéder à votre espace personnel
            </p>
          </div>
        </div>
        { isAdmin ? <BlogPostForm /> : null }
        {/* <BlogPostForm /> */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {user ? (
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Bienvenue, {user?.firstName}</h2>
                  {isAdmin  ? (
                    <p className="text-gray-600 mt-1">Rôle: prof</p>
                  ) : (
                    <p className="text-gray-600 mt-1">Rôle: student</p>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <a href="#" className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {isAdmin  ? (
                        <span className="text-sm text-gray-700">Mes documents</span>
                      ) : (
                        null
                      )}
                      {/* <span className="text-sm text-gray-700">Mes documents</span> */}
                    </a>
                    <a href="#" className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-700">Mon emploi du temps</span>
                    </a>
                    <a href="#" className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span className="text-sm text-gray-700">Mes notes</span>
                    </a>
                    <a href="#" className="text-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                      <svg className="w-6 h-6 mx-auto mb-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                      </svg>
                      <span className="text-sm text-gray-700">Messages</span>
                    </a>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    // onClick={() => console.log('logout')}
                    className="w-full py-3 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                  >
                    Se déconnecter
                  </button>
                </div>
              </div>
            ) : (

              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                test
              </div>
            )}
          </div>
        </section>
      <Footer />
    </main>
  );
}
