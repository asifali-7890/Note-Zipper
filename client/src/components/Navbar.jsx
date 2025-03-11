import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Sync search query with URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setSearchQuery(searchParams.get('search') || '');
    }, [location.search]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedQuery = searchQuery.trim();

        if (trimmedQuery) {
            navigate(`/?search=${encodeURIComponent(trimmedQuery)}`);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="bg-gray-50 p-4 shadow-lg">
            <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Brand and Mobile Menu */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors md:text-2xl"
                    >
                        Note Zipper
                    </Link>

                    {/* Mobile Auth Buttons */}
                    <div className="flex items-center gap-2 md:hidden">
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="rounded-md p-2 text-blue-600 hover:bg-blue-100"
                                >
                                    <span className="sr-only">Profile</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="rounded-md bg-red-600 p-2 text-white hover:bg-red-700"
                                >
                                    <span className="sr-only">Logout</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                                >
                                    <span className="text-white"> Login</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="w-full flex-1 md:max-w-xl lg:max-w-2xl"
                >
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <label htmlFor="searchInput" className="sr-only">Search notes</label>
                        <input
                            id="searchInput"
                            type="text"
                            placeholder="Search notes..."
                            className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Desktop Auth Links */}
                <div className="hidden items-center gap-4 md:flex">
                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="text-blue-600 hover:text-blue-700 hover:underline"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-md bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                            >
                                <span className="text-white">Login</span>
                            </Link>
                            <Link
                                to="/register"
                                className="rounded-md bg-teal-600 px-8 py-3 text-white font-semibold hover:bg-teal-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg ml-4"
                            >
                                <span className="text-white">Register</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;