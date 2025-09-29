import { supabase } from './supabase';

export interface ImageUploadResult {
  url: string;
  path: string;
  size: number;
  type: string;
}

export const uploadImageToSupabase = async (file: File): Promise<ImageUploadResult> => {
  try {
    console.log('📸 Début upload avec watermark pour:', file.name);
    
    // Add watermark to the image before upload
    const watermarkedFile = await addWatermarkToImage(file);
    console.log('✅ Watermark ajouté, taille:', watermarkedFile.size);
    
    // Validation du fichier
    if (!watermarkedFile.type.startsWith('image/')) {
      throw new Error('Le fichier doit être une image');
    }
    
    if (watermarkedFile.size > 25 * 1024 * 1024) { // 25MB max pour qualité originale
      throw new Error('L\'image ne doit pas dépasser 25MB');
    }
    
    // Générer un nom de fichier unique
    const fileExt = watermarkedFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `reviews/${fileName}`;
    
    // Upload vers Supabase Storage - qualité originale préservée
    const { data, error } = await supabase.storage
      .from('review-photos')
      .upload(filePath, watermarkedFile, {
        cacheControl: '3600',
        upsert: false,
      });
    
    if (error) {
      console.error('Supabase Storage error:', error);
      throw error;
    }
    
    // Obtenir l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from('review-photos')
      .getPublicUrl(filePath);
    
    console.log('✅ Image uploadée avec watermark:', publicUrl);
    
    return {
      url: publicUrl,
      path: filePath,
      size: watermarkedFile.size,
      type: watermarkedFile.type
    };
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    throw error;
  }
};

// Function to add watermark directly to image file
const addWatermarkToImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    console.log('🎨 Ajout du watermark à:', file.name);
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      console.log('📐 Dimensions image:', img.width, 'x', img.height);
      
      const { width, height } = img;
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw the original image
      ctx?.drawImage(img, 0, 0, width, height);
      
      if (ctx) {
        // Add multiple watermarks
        const watermarkText = '© Normandie Tours';
        const fontSize = Math.max(24, Math.min(width, height) / 25);
        
        console.log('📝 Taille police watermark:', fontSize);
        
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        const textMetrics = ctx.measureText(watermarkText);
        const textWidth = textMetrics.width;
        const textHeight = fontSize;
        
        // Function to draw watermark at position
        const drawWatermark = (x: number, y: number, opacity: number = 0.3) => {
          // Semi-transparent background
          ctx.fillStyle = `rgba(0, 0, 0, ${opacity * 0.4})`;
          ctx.fillRect(x - 8, y - 4, textWidth + 16, textHeight + 8);
          
          // White text
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.fillText(watermarkText, x, y);
        };
        
        const margin = Math.max(20, width / 50);
        
        console.log('🎯 Ajout de watermarks discrets...');
        
        // Seulement 3 watermarks discrets
        // Coin bas droit (principal)
        drawWatermark(width - textWidth - margin, height - textHeight - margin, 0.4);
        
        // Centre (très discret)
        drawWatermark(width / 2 - textWidth / 2, height / 2 - textHeight / 2, 0.2);
        
        // Coin haut gauche (discret) seulement pour les grandes images
        if (width > 800 && height > 600) {
          drawWatermark(margin, margin, 0.3);
        }
        
        console.log('✅ Watermarks discrets ajoutés avec succès');
      }
      
      // Convert canvas to blob and then to File
      canvas.toBlob((blob) => {
        if (blob) {
          console.log('💾 Conversion en fichier terminée, taille:', blob.size);
          const watermarkedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });
          resolve(watermarkedFile);
        } else {
          console.error('❌ Échec de la conversion en blob');
          reject(new Error('Failed to create watermarked image'));
        }
      }, 'image/jpeg', 0.92); // High quality JPEG
    };
    
    img.onerror = () => {
      console.error('❌ Erreur de chargement de l\'image pour watermark');
      reject(new Error('Error loading image for watermarking'));
    };
    img.src = URL.createObjectURL(file);
  });
};
export const uploadMultipleImagesToSupabase = async (files: File[]): Promise<string[]> => {
  try {
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await uploadImageToSupabase(file);
        return result.url;
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        throw error;
      }
    });
    
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
};

export const deleteImageFromSupabase = async (filePath: string): Promise<void> => {
  try {
    const { error } = await supabase.storage
      .from('review-photos')
      .remove([filePath]);
    
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting image from Supabase:', error);
    throw error;
  }
};