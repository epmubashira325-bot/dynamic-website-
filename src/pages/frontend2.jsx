import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ProjectsPage.css";

// Assets
import project1 from "../assets/images/projects/project1.jpg";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.jpg";
import project4 from "../assets/images/projects/project4.jpg";
import project5 from "../assets/images/projects/project5.jpg";
import interior from "../assets/images/services/interior.jpg";
import construction from "../assets/images/services/construction.jpg";
import renovation from "../assets/images/services/renovation.jpg";
import structural from "../assets/images/services/structural.jpg";

const storyProjects = [
    {
        id: "luxury-villa",
        title: "Luxury Villa",
        heroImage: project1,
        intro: "A contemporary residence designed with premium materials, spacious interiors, and structural excellence.",
        sequence: [
            { image: interior, caption: "Expansive Living Room with Panoramic Views" },
            { image: project2, caption: "Master Bedroom Retreat" },
            { image: renovation, caption: "Modern Open-Plan Kitchen" }
        ]
    },
    {
        id: "commercial-office",
        title: "Commercial Office",
        heroImage: construction,
        intro: "A state-of-the-art commercial space engineered for productivity, natural light, and modern aestheticssdfghjklertyuikolsxdcfvbnm,cvbnm,wertyuiopsdfghjklwsdefrgthyjukl,mnbvcxsdfrghjkoiuytrewasdfghjkl,mnbvcxzasdfghjklpoiuytrewq.",
        sequence: [
            { image: project3, caption: "Grand Reception Lobby" },
            { image: structural, caption: "Collaborative Workspace Architecture" },
            { image: project4, caption: "Executive Boardroom" }
        ]
    },
    {
        id: "heritage-restoration",
        title: "Heritage Restoration",
        heroImage: project5,
        intro: "Restoring classic architectural elements while integrating cutting-edge modern engineering.",
        sequence: [
            { image: project1, caption: "Restored Exterior Facade" },
            { image: interior, caption: "Classic Interior Details" }
        ]
    }
];

function ProjectsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="portfolio-page">
            <Navbar />

            {storyProjects.map((project, index) => (
                <div key={project.id} className="story-project">

                    {/* 1. Fullscreen Hero */}
                    <section className="story-hero">
                        <motion.div
                            className="story-hero__bg"
                            style={{ backgroundImage: `url(${project.heroImage})` }}
                            initial={{ scale: 1.15 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 4, ease: "easeOut" }}
                            viewport={{ once: true }}
                        />
                        <div className="story-hero__overlay"></div>
                        <motion.h1
                            className="story-hero__title"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {project.title}
                        </motion.h1>
                    </section>

                    {/* 2. Premium Introduction */}
                    <section className="story-intro">
                        <div className="story-intro__bg-pattern"></div>
                        <div className="story-intro__container">
                            <motion.h2
                                className="story-intro__name"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {project.title}
                            </motion.h2>
                            <motion.div
                                className="story-intro__divider"
                                initial={{ opacity: 0, width: 0 }}
                                whileInView={{ opacity: 1, width: "60px" }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            ></motion.div>
                            <motion.p
                                className="story-intro__desc"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {project.intro}
                            </motion.p>
                        </div>
                    </section>

                    {/* 3. Image Sequence */}
                    <section className="story-sequence">
                        {project.sequence.map((seq, i) => (
                            <div key={i} className="story-block">
                                <div className="story-block__image-container">
                                    <motion.img
                                        src={seq.image}
                                        alt={seq.caption}
                                        className="story-block__img"
                                        initial={{ scale: 1.1 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-50px" }}
                                    />
                                </div>
                                <motion.div
                                    className="story-block__caption"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                >
                                    {seq.caption}
                                </motion.div>
                            </div>
                        ))}
                    </section>

                </div>
            ))}

            <Footer />
        </div>
    );
}

export default ProjectsPage;