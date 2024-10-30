import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children, classStyle }) {
    return (
        <div className="min-h-screen  pt-6 sm:pt-0 bg-gray-100">


            <div className={ classStyle }>
                { children }
            </div>
        </div>
    );
}
