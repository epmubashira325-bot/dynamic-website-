// src/components/ServiceCard.jsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";

function ServiceCard({ svc, index, onEdit, onDelete, isAdmin, getMediaUrl }) {
    const videoRef = useRef(null);
    const [hovering, setHovering] = useState(false);

    const handleEnter = () => {
        setHovering(true);
        videoRef.current?.play().catch(() => { });
    };

    const handleLeave = () => {
        setHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const imageUrl = svc.image ? getMediaUrl(svc.image) : null;

    return (
        <div
            className="service-card-wrapper"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
        >
            <div className="service-card">
                <div className="service-card-image">
                    {imageUrl ? (
                        <img src={imageUrl} alt={svc.title} loading="lazy" />
                    ) : (
                        <div className="service-card-placeholder">
                            <span>No Image</span>
                        </div>
                    )}
                    {!svc.is_active && (
                        <div className="service-card-badge inactive">Inactive</div>
                    )}
                </div>
                <div className="service-card-content">
                    <h3 className="service-card-title">{svc.title}</h3>
                    <p className="service-card-description">{svc.description}</p>
                    <div className="service-card-footer">
                        <Link to={`/services/${svc.id}`} className="service-card-link">
                            Learn More <FaArrowRight />
                        </Link>
                        {isAdmin && (
                            <div className="service-card-actions">
                                <button onClick={() => onEdit(svc)} className="service-card-action-btn edit">
                                    <FaEdit />
                                </button>
                                <button onClick={() => onDelete(svc)} className="service-card-action-btn delete">
                                    <FaTrash />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceCard;
