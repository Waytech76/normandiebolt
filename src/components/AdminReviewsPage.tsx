import React, { useState, useEffect } from 'react';
import { Star, Check, X, Eye, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { ReviewService, Review } from '../lib/reviewService';

const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadReviews();
    
    // Écouter les nouveaux avis
    const handleNewReview = () => {
      console.log('🔄 Nouveau avis reçu, rechargement...');
      loadReviews();
    };
    
    window.addEventListener('reviewSubmitted', handleNewReview);
    window.addEventListener('reviewApproved', handleNewReview);
    window.addEventListener('reviewDeleted', handleNewReview);
    
    return () => {
      window.removeEventListener('reviewSubmitted', handleNewReview);
      window.removeEventListener('reviewApproved', handleNewReview);
      window.removeEventListener('reviewDeleted', handleNewReview);
    };
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      console.log('📥 Chargement des avis...');
      
      const allReviews = await ReviewService.getAllReviews();
      console.log('✅ Avis chargés:', allReviews.length);
      
      setReviews(allReviews);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des avis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string) => {
    try {
      setActionLoading(reviewId);
      console.log('✅ Approbation de l\'avis:', reviewId);
      
      const result = await ReviewService.approveReview(reviewId);
      
      if (result.success) {
        console.log('✅ Avis approuvé avec succès');
        // Mettre à jour l'état local
        setReviews(prev => prev.map(review => 
          review.id === reviewId ? { ...review, approved: true } : review
        ));
        
        // Notifier la page d'accueil
        window.dispatchEvent(new CustomEvent('reviewApproved'));
      } else {
        console.error('❌ Erreur approbation:', result.error);
        alert('Erreur lors de l\'approbation: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Erreur handleApprove:', error);
      alert('Erreur lors de l\'approbation');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) {
      return;
    }
    
    try {
      setActionLoading(reviewId);
      console.log('🗑️ Suppression de l\'avis:', reviewId);
      
      const result = await ReviewService.deleteReview(reviewId);
      
      if (result.success) {
        console.log('✅ Avis supprimé avec succès');
        // Mettre à jour l'état local
        setReviews(prev => prev.filter(review => review.id !== reviewId));
      } else {
        console.error('❌ Erreur suppression:', result.error);
        alert('Erreur lors de la suppression: ' + result.error);
      }
    } catch (error) {
      console.error('❌ Erreur handleDelete:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (approved: boolean) => {
    if (approved) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          ✅ Approuvé
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
        ⏳ En attente
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold">Panel Administrateur</h1>
                <p className="text-blue-100 mt-1">Gestion des avis clients</p>
              </div>
              <button
                onClick={loadReviews}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 border-b bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-gray-900">{reviews.length}</div>
                <div className="text-gray-600">Total des avis</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-600">
                  {reviews.filter(r => r.approved).length}
                </div>
                <div className="text-gray-600">Avis approuvés</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-yellow-600">
                  {reviews.filter(r => !r.approved).length}
                </div>
                <div className="text-gray-600">En attente</div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-2">Chargement des avis...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Aucun avis pour le moment</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{review.tour_name}</h3>
                        <p className="text-gray-600">
                          {review.client_name} • {new Date(review.created_at).toLocaleDateString('fr-FR')}
                        </p>
                        {review.client_email && (
                          <p className="text-sm text-gray-500">{review.client_email}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        {getStatusBadge(review.approved)}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    {/* Photos */}
                    {review.photos && review.photos.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Photos ({review.photos.length})
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {review.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo}
                                alt={`Review photo ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity shadow-md"
                                onClick={() => {
                                  // Créer un événement personnalisé pour ouvrir l'image en plein écran
                                  const event = new CustomEvent('openFullscreenImage', { detail: photo });
                                  window.dispatchEvent(event);
                                }}
                                onError={(e) => {
                                  console.error('Erreur chargement image:', photo);
                                  e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Erreur';
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-3">
                      {!review.approved && (
                        <button
                          onClick={() => handleApprove(review.id)}
                          disabled={actionLoading === review.id}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          {actionLoading === review.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          <span>Approuver</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={actionLoading === review.id}
                        className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === review.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        <span>Supprimer</span>
                      </button>
                      
                      {review.photos && review.photos.length > 0 && (
                        <button
                          onClick={() => setSelectedReview(review)}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Voir photos</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Modal */}
      {selectedReview && selectedReview.photos && selectedReview.photos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedReview.tour_name}</h3>
                  <p className="text-gray-600">{selectedReview.client_name}</p>
                </div>
                <button
                  onClick={() => setSelectedReview(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedReview.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Review photo ${index + 1}`}
                      className="w-full h-auto object-contain rounded-lg max-h-96"
                      onError={(e) => {
                        console.error('Erreur chargement image:', photo);
                        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Erreur+Image';
                      }}
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">{selectedReview.comment}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReviewsPage;