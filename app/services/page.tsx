'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, Code, CheckCircle, ArrowRight } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { Suspense, useRef, useEffect } from 'react'
import Link from 'next/link'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 25], fov: 60 }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#f8f9ff"]} />
          <fog attach="fog" args={["#f8f9ff", 20, 40]} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          
          {/* Modern particle network */}
          <ParticleNetwork />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            rotateSpeed={0.4}
            autoRotate={true}
            autoRotateSpeed={0.1}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-blue-100/40" />
    </div>
  )
}

function ParticleNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<any[]>([]);
  const particleCount = 100;
  const connectionDistance = 6;
  
  // Setup particles
  useEffect(() => {
    particlesRef.current = Array(particleCount).fill(null).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      connections: []
    }));
  }, []);
  
  // Animation loop
  useFrame(() => {
    if (!groupRef.current) return;
    
    const particles = particlesRef.current;
    const group = groupRef.current;
    
    // Remove old connections
    while (group.children.length > particleCount) {
      group.remove(group.children[group.children.length - 1]);
    }
    
    // Update particles and create connections
    particles.forEach((particle, i) => {
      // Update position with velocity
      particle.position.add(particle.velocity);
      
      // Boundary check and bounce
      ['x', 'y', 'z'].forEach(axis => {
        const limit = axis === 'x' ? 15 : axis === 'y' ? 10 : 7.5;
        if (Math.abs(particle.position[axis]) > limit) {
          particle.velocity[axis] *= -1;
        }
      });
      
      // Update particle mesh position
      if (group.children[i]) {
        group.children[i].position.copy(particle.position);
      }
      
      // Find and create connections
      particle.connections = [];
      particles.forEach((otherParticle, j) => {
        if (i !== j) {
          const distance = particle.position.distanceTo(otherParticle.position);
          if (distance < connectionDistance) {
            particle.connections.push({ to: j, distance });
            
            // Create/update line
            const lineId = i < j ? `${i}-${j}` : `${j}-${i}`;
            let line = group.children.find(c => c.userData.id === lineId);
            
            if (!line && i < j) { // Create only once per pair
              const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                particle.position, otherParticle.position
              ]);
              const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x5f6caf,
                transparent: true,
                opacity: Math.max(0.1, 1 - distance / connectionDistance)
              });
              line = new THREE.Line(lineGeometry, lineMaterial);
              line.userData = { id: lineId };
              group.add(line);
            } else if (line) { // Update existing line
              // Cast line to THREE.Line to fix TypeScript errors
              const typedLine = line as THREE.Line;
              const positions = typedLine.geometry.attributes.position.array;
              positions[0] = particle.position.x;
              positions[1] = particle.position.y;
              positions[2] = particle.position.z;
              positions[3] = otherParticle.position.x;
              positions[4] = otherParticle.position.y;
              positions[5] = otherParticle.position.z;
              typedLine.geometry.attributes.position.needsUpdate = true;
              
              // Update opacity based on distance
              (typedLine.material as THREE.LineBasicMaterial).opacity = Math.max(0.1, 1 - distance / connectionDistance);
            }
          }
        }
      });
    });
  });
  
  return (
    <group ref={groupRef}>
      {Array(particleCount).fill(null).map((_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#4361ee" 
            emissive="#3f37c9"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

const services = [
  {
    icon: Briefcase,
    title: 'Professional IT Implementation Services',
    description: `Our team of technical experts brings hands-on experience to tackle complex IT projects. We specialize in configuring enterprise platforms, ensuring smooth integration and optimized performance.`,
    details: [
      'Enterprise Platform Configuration – Our experts customize and configure your enterprise systems to enhance performance and usability.',
      'Advanced Report Writing – We simplify the process of generating custom reports using SSRS, Crystal Reports, and other reporting tools, helping you gain valuable business insights.'
    ],
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1600'
  },
  {
    icon: Code,
    title: 'Software Engineering & Development Services',
    description: `BQI Tech offers full-cycle software development services, from concept and design to deployment and maintenance. Our team of software engineers, DevOps professionals, and UX designers ensures innovative, high-quality solutions that meet your business needs.`,
    details: [
      'Custom Software Development - We build tailor-made web and mobile applications that align with your business objectives.',
      'COTS Software Optimization - We enhance, manage, and integrate commercial off-the-shelf (COTS) software, providing a scalable and future-ready foundation for your business.',
      'Platform Engineering & DevOps - Our DevOps expertise ensures efficient CI/CD pipelines, automation, and cloud optimization, enhancing operational efficiency and cost-effectiveness.'
    ],
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1600'
  }
]

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Services" }
  ]

  return (
    <>
      <AnimatedBackground />
      <motion.main 
        className="container mx-auto px-4 py-16 -mt-16 relative"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 }
        }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb items={breadcrumbItems} />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16 py-24 overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-700/70 via-indigo-600/70 to-cyan-600/70" />
          </div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Our Services
            </h1>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Comprehensive IT Solutions to Drive Business Success
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 p-8 rounded-2xl bg-white/95 backdrop-blur-sm shadow-xl"
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-800 leading-relaxed font-medium">
              At BQI Tech, we provide end-to-end software development, IT consulting, and DevOps solutions to help 
              businesses optimize operations and achieve digital transformation. Our expertise spans custom software 
              development, enterprise platform engineering, and IT implementation, ensuring seamless and scalable 
              solutions for every industry.
            </p>
          </div>
        </motion.section>

        {services.map((service, index) => (
          <motion.section
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 * index }}
            className="mb-24 group"
          >
            <div className="relative p-8 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg
                            hover:bg-white/98 transition-all duration-500
                            before:absolute before:inset-0 before:rounded-2xl
                            before:bg-gradient-to-r before:from-violet-500/20 before:to-cyan-500/20
                            before:opacity-0 before:transition-opacity hover:before:opacity-100"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center relative">
                <div className={`space-y-6 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">{service.title}</h2>
                  </div>
                  <p className="text-lg text-gray-800 font-medium">{service.description}</p>
                  <ul className="space-y-4">
                    {service.details.map((detail, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-gray-800"
                      >
                        <span className="mt-1.5 h-3 w-3 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex-shrink-0" />
                        <span className="font-medium">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-[400px] group ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full rounded-lg overflow-hidden shadow-xl"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}

        {/* Why Choose BQI Tech Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-violet-700 via-indigo-600 to-cyan-600 relative overflow-hidden"
        >
          <div className="absolute inset-0  bg-repeat opacity-10" />
          <motion.div
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 bg-gradient-to-r from-violet-400/5 to-cyan-400/5"
          />
          
          <div className="max-w-4xl mx-auto relative">
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </span>
              Why Choose BQI Tech?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Industry-Leading Expertise",
                  description: "Our team stays ahead of industry trends, delivering cutting-edge solutions."
                },
                {
                  title: "Scalable & Secure Solutions",
                  description: "We implement future-proof, security-focused IT strategies."
                },
                {
                  title: "End-to-End IT Services",
                  description: "From implementation to maintenance, we provide seamless IT solutions."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-6 hover:bg-white/30 
                             transition-all duration-300 border border-white/30 hover:border-white/40
                             hover:shadow-lg hover:shadow-white/10"
                >
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-white/90 font-medium leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 mb-24 p-12 rounded-2xl bg-white/90 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold mb-4">Interested in Our Services?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how BQI Tech can empower your business with advanced IT solutions.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/contact-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 
                           text-white rounded-full px-12 py-4 text-lg font-semibold inline-flex items-center gap-2 
                           shadow-lg shadow-violet-500/20 transition-all duration-300"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </motion.section>
      </motion.main>
    </>
  )
}
