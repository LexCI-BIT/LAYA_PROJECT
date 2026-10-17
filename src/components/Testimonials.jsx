import React, { useEffect, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const sectionRef = useRef(null);

    // Muted autoplay, only while a video is on screen so three videos aren't playing at once off-screen
    useEffect(() => {
        const videos = sectionRef.current.querySelectorAll('video');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(({ target, isIntersecting }) => {
                if (isIntersecting) target.play().catch(() => {});
                else target.pause();
            });
        }, { threshold: 0.5 });
        // Only one video plays sound at a time: unmuting one mutes the rest
        const onVolumeChange = (e) => {
            if (e.target.muted) return;
            videos.forEach((v) => { if (v !== e.target) v.muted = true; });
        };
        videos.forEach((v) => {
            v.muted = true; // React doesn't reliably set the muted attribute, and browsers block unmuted autoplay
            observer.observe(v);
            v.addEventListener('volumechange', onVolumeChange);
        });
        return () => {
            observer.disconnect();
            videos.forEach((v) => v.removeEventListener('volumechange', onVolumeChange));
        };
    }, []);

    const reviews = [
        {
            text: "Excellent quality and modern design. Very satisfied with the work.",
            author: "Satisfied Homeowner",
            location: "Hyderabad"
        },
        {
            text: "The precision in their aluminium work is unmatched. Truly premium.",
            author: "Interior Enthusiast",
            location: "Warangal"
        },
        {
            text: "Professional team and on-time delivery. Highly recommended!",
            author: "Business Owner",
            location: "Vijayawada"
        }
    ];

    const additionalVideos = [
        {
            src: "/videos/client_testimontial2.MP4",
            title: "Crafting Dream Spaces",
            desc: "\"From concept to completion, Laya Space Design delivered excellence at every step of our project.\""
        },
        {
            src: "/videos/client_testimonial.mp4",
            title: "Beyond Expectations",
            desc: "\"The attention to detail and quality of materials used truly set them apart from every other team we considered.\""
        }
    ];

    return (
        <section className="testimonials" id="testimonials" ref={sectionRef}>
            <div className="container">
                <h2 className="testimonials-title reveal-on-scroll">What Our Clients Say</h2>
                
                {/* Featured Video Testimonial */}
                <div className="featured-video-container reveal-on-scroll delay-100">
                    <div className="video-wrapper">
                        <video 
                            controls
                            preload="metadata"
                            muted
                            loop
                            playsInline
                            className="testimonial-video"
                        >
                            <source src="/videos/client_testimonatial3.MP4#t=0.1" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="video-overlay">
                            <span className="play-hint">Watch Client Story</span>
                        </div>
                    </div>
                    <div className="video-meta">
                        <h3 className="video-client-name">A Modern Transformation</h3>
                        <p className="video-client-desc">“The precision and dedication of Laya Space Design brought our vision to life in ways we never imagined.”</p>
                    </div>
                </div>

                {/* Additional Video Testimonials */}
                <div className="video-testimonials-grid">
                    {additionalVideos.map((video, index) => (
                        <div key={index} className={`video-testimonial-card reveal-on-scroll delay-${(index + 1) * 200}`}>
                            <div className="video-card-wrapper">
                                <video 
                                    controls
                                    preload="metadata"
                                    muted
                                    loop
                                    playsInline
                                    className="testimonial-video-card"
                                >
                                    <source src={`${video.src}#t=0.1`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <div className="video-overlay">
                                    <span className="play-hint">Watch Client Story</span>
                                </div>
                            </div>
                            <div className="video-card-meta">
                                <h3 className="video-card-title">{video.title}</h3>
                                <p className="video-card-desc">{video.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="testimonials-grid">
                    {reviews.map((review, index) => (
                        <div key={index} className={`testimonial-card reveal-on-scroll delay-${(index % 3) * 100 + 100}`}>
                            <p className="testimonial-text">“{review.text}”</p>
                            <div className="testimonial-author">
                                <span className="author-name">{review.author}</span>
                                <span className="author-location">{review.location}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
