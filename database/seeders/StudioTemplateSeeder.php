<?php

namespace Database\Seeders;

use App\Models\StudioTemplate;
use Illuminate\Database\Seeder;

class StudioTemplateSeeder extends Seeder
{
    public function run()
    {
        $templates = [
            [
                'name' => 'Logo',
                'icon' => 'PenTool',
                'color' => 'bg-yellow-100 text-yellow-700',
                'order' => 1,
                'thumbnail_url' => '/images/templates/logo-general.png',
                'canvas_data' => [
                    'version' => '5.3.0',
                    'objects' => [
                        [
                            'type' => 'image',
                            'version' => '5.3.0',
                            'originX' => 'left',
                            'originY' => 'top',
                            'left' => 250,
                            'top' => 150,
                            'scaleX' => 0.5,
                            'scaleY' => 0.5,
                            'src' => '/images/templates/logo-general.png',
                            'crossOrigin' => 'anonymous',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Banner Toko',
                'icon' => 'ImageIcon',
                'color' => 'bg-green-100 text-green-700',
                'order' => 2,
                'thumbnail_url' => '/images/templates/banner-shop.png',
                'canvas_data' => [
                    'version' => '5.3.0',
                    'objects' => [
                        [
                            'type' => 'image',
                            'version' => '5.3.0',
                            'originX' => 'left',
                            'originY' => 'top',
                            'left' => 0,
                            'top' => 150,
                            'scaleX' => 0.8,
                            'scaleY' => 0.8,
                            'src' => '/images/templates/banner-shop.png',
                            'crossOrigin' => 'anonymous',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Kartu Nama',
                'icon' => 'CreditCard',
                'color' => 'bg-orange-100 text-orange-700',
                'order' => 3,
                'thumbnail_url' => '/images/templates/card-business.png',
                'canvas_data' => [
                    'version' => '5.3.0',
                    'objects' => [
                        [
                            'type' => 'image',
                            'version' => '5.3.0',
                            'originX' => 'left',
                            'originY' => 'top',
                            'left' => 150,
                            'top' => 150,
                            'scaleX' => 0.6,
                            'scaleY' => 0.6,
                            'src' => '/images/templates/card-business.png',
                            'crossOrigin' => 'anonymous',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Label Kemasan',
                'icon' => 'Tag',
                'color' => 'bg-purple-100 text-purple-700',
                'order' => 4,
                'thumbnail_url' => '/images/templates/label-product.png',
                'canvas_data' => [
                    'version' => '5.3.0',
                    'objects' => [
                        [
                            'type' => 'image',
                            'version' => '5.3.0',
                            'originX' => 'left',
                            'originY' => 'top',
                            'left' => 250,
                            'top' => 200,
                            'scaleX' => 0.5,
                            'scaleY' => 0.5,
                            'src' => '/images/templates/label-product.png',
                            'crossOrigin' => 'anonymous',
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Logo Kuliner',
                'icon' => 'Utensils',
                'color' => 'bg-green-100 text-green-700',
                'order' => 0,
                'thumbnail_url' => '/images/templates/logo-food.png',
                'canvas_data' => [
                    'version' => '5.3.0',
                    'objects' => [
                        [
                            'type' => 'image',
                            'version' => '5.3.0',
                            'originX' => 'left',
                            'originY' => 'top',
                            'left' => 250,
                            'top' => 150,
                            'scaleX' => 0.5,
                            'scaleY' => 0.5,
                            'src' => '/images/templates/logo-food.png',
                            'crossOrigin' => 'anonymous',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($templates as $template) {
            StudioTemplate::create($template);
        }
    }
}
