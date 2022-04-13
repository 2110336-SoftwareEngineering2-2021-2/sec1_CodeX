import { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import "../components/profile/profile.css"
import AdminBanUI from '../components/report/AdminBanUI';
import BarButton from '../components/ui/BarButton';

const UserReportPage = () => {
    const [selectedBar, setSelectedBar] = useState('report'); // report || ban

    const renderContent = () => {
        switch (selectedBar) {
            case "report":
                return <AdminBanUI/>;
            case "ban":
                return <p>this is AdminUnBanUI class</p>;
            default :
                return <p>something went wrong</p>;
        }
    }
    
    return (
        <>
        {/* Button Bar Section */}

            <div className="bar-with-button">
                <div className="bar">
                    <BarButton
                        title="Submitted Reports"
                        onSelect={() => setSelectedBar('report')}
                        isActive={selectedBar === 'report'}
                        // widthStyle={widthStyle}
                    />
                    <BarButton
                        title="Banned User"
                        onSelect={() => setSelectedBar('ban')}
                        isActive={selectedBar === 'ban'}
                        // widthStyle={widthStyle}
                    />
                </div>
            </div>

            {renderContent()}

        </>
    )
}

export default UserReportPage
