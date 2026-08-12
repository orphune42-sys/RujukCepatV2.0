import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { fadeIn, slideUp, staggerContainer } from '../../utils/animations';

export default function HubungiKami() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h1 variants={slideUp} className="text-4xl font-bold text-text dark:text-text-dark mb-4">
              Hubungi Kami
            </motion.h1>
            <motion.p variants={slideUp} className="text-lg text-muted dark:text-gray-400 max-w-2xl mx-auto">
              Ada pertanyaan terkait integrasi fasilitas kesehatan atau pelaporan kendala teknis sistem RujukCepat? Tim kami siap membantu.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <motion.div variants={slideUp} className="lg:col-span-1 space-y-6">
              <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm h-full">
                <CardContent className="p-8 space-y-8">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-accent dark:text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text dark:text-text-dark">Kantor Pusat</h3>
                    </div>
                    <p className="text-muted dark:text-gray-400 pl-[3.25rem]">
                      Gedung Kemenkes Lt. 3<br />
                      Jl. H.R. Rasuna Said Kav 4-9<br />
                      Jakarta Selatan 12950
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-accent dark:text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text dark:text-text-dark">Telepon</h3>
                    </div>
                    <p className="text-muted dark:text-gray-400 pl-[3.25rem]">
                      1-500-567 (Halo Kemenkes)<br />
                      Senin - Jumat, 08:00 - 16:00 WIB
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-primary/20 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-accent dark:text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text dark:text-text-dark">Email</h3>
                    </div>
                    <p className="text-muted dark:text-gray-400 pl-[3.25rem]">
                      halo@rujukcepat.go.id<br />
                      support@rujukcepat.go.id
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={slideUp} className="lg:col-span-2">
              <Card className="bg-white dark:bg-[#15241b] border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-text dark:text-text-dark mb-6">Kirim Pesan</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-text-dark">Nama Lengkap</label>
                        <input 
                          type="text" 
                          className="w-full h-11 px-4 rounded-lg border border-border dark:border-border-dark bg-background dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                          placeholder="Masukkan nama Anda"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text dark:text-text-dark">Email</label>
                        <input 
                          type="email" 
                          className="w-full h-11 px-4 rounded-lg border border-border dark:border-border-dark bg-background dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                          placeholder="Masukkan email Anda"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text dark:text-text-dark">Subjek</label>
                      <input 
                        type="text" 
                        className="w-full h-11 px-4 rounded-lg border border-border dark:border-border-dark bg-background dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                        placeholder="Topik pesan Anda"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text dark:text-text-dark">Pesan</label>
                      <textarea 
                        className="w-full p-4 rounded-lg border border-border dark:border-border-dark bg-background dark:bg-[#0a120e] text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary transition-shadow min-h-[150px] resize-y"
                        placeholder="Jelaskan kendala atau pertanyaan Anda secara detail..."
                      ></textarea>
                    </div>

                    <Button className="w-full md:w-auto" size="lg">
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
