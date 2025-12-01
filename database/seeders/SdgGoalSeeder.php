<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SdgGoal;

class SdgGoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sdgGoals = [
            [
                'goal_number' => 1,
                'title' => 'No Poverty',
                'description' => 'End poverty in all its forms everywhere',
                'color' => '#E5243B',
                'icon_url' => '/images/sdg/E_SDG_Icons-01.jpg',
            ],
            [
                'goal_number' => 2,
                'title' => 'Zero Hunger',
                'description' => 'End hunger, achieve food security and improved nutrition',
                'color' => '#DDA63A',
                'icon_url' => '/images/sdg/E_SDG_Icons-02.jpg',
            ],
            [
                'goal_number' => 3,
                'title' => 'Good Health and Well-being',
                'description' => 'Ensure healthy lives and promote well-being for all',
                'color' => '#4C9F38',
                'icon_url' => '/images/sdg/E_SDG_Icons-03.jpg',
            ],
            [
                'goal_number' => 4,
                'title' => 'Quality Education',
                'description' => 'Ensure inclusive and equitable quality education',
                'color' => '#C5192D',
                'icon_url' => '/images/sdg/E_SDG_Icons-04.jpg',
            ],
            [
                'goal_number' => 5,
                'title' => 'Gender Equality',
                'description' => 'Achieve gender equality and empower all women and girls',
                'color' => '#FF3A21',
                'icon_url' => '/images/sdg/E_SDG_Icons-05.jpg',
            ],
            [
                'goal_number' => 6,
                'title' => 'Clean Water and Sanitation',
                'description' => 'Ensure availability and sustainable management of water',
                'color' => '#26BDE2',
                'icon_url' => '/images/sdg/E_SDG_Icons-06.jpg',
            ],
            [
                'goal_number' => 7,
                'title' => 'Affordable and Clean Energy',
                'description' => 'Ensure access to affordable, reliable, sustainable energy',
                'color' => '#FCC30B',
                'icon_url' => '/images/sdg/E_SDG_Icons-07.jpg',
            ],
            [
                'goal_number' => 8,
                'title' => 'Decent Work and Economic Growth',
                'description' => 'Promote sustained, inclusive and sustainable economic growth',
                'color' => '#A21942',
                'icon_url' => '/images/sdg/E_SDG_Icons-08.jpg',
            ],
            [
                'goal_number' => 9,
                'title' => 'Industry, Innovation and Infrastructure',
                'description' => 'Build resilient infrastructure, promote industrialization',
                'color' => '#FD6925',
                'icon_url' => '/images/sdg/E_SDG_Icons-09.jpg',
            ],
            [
                'goal_number' => 10,
                'title' => 'Reduced Inequalities',
                'description' => 'Reduce inequality within and among countries',
                'color' => '#DD1367',
                'icon_url' => '/images/sdg/E_SDG_Icons-10.jpg',
            ],
            [
                'goal_number' => 11,
                'title' => 'Sustainable Cities and Communities',
                'description' => 'Make cities and human settlements inclusive and sustainable',
                'color' => '#FD9D24',
                'icon_url' => '/images/sdg/E_SDG_Icons-11.jpg',
            ],
            [
                'goal_number' => 12,
                'title' => 'Responsible Consumption and Production',
                'description' => 'Ensure sustainable consumption and production patterns',
                'color' => '#BF8B2E',
                'icon_url' => '/images/sdg/E_SDG_Icons-12.jpg',
            ],
            [
                'goal_number' => 13,
                'title' => 'Climate Action',
                'description' => 'Take urgent action to combat climate change',
                'color' => '#3F7E44',
                'icon_url' => '/images/sdg/E_SDG_Icons-13.jpg',
            ],
            [
                'goal_number' => 14,
                'title' => 'Life Below Water',
                'description' => 'Conserve and sustainably use the oceans and marine resources',
                'color' => '#0A97D9',
                'icon_url' => '/images/sdg/E_SDG_Icons-14.jpg',
            ],
            [
                'goal_number' => 15,
                'title' => 'Life on Land',
                'description' => 'Protect, restore and promote sustainable use of ecosystems',
                'color' => '#56C02B',
                'icon_url' => '/images/sdg/E_SDG_Icons-15.jpg',
            ],
            [
                'goal_number' => 16,
                'title' => 'Peace, Justice and Strong Institutions',
                'description' => 'Promote peaceful and inclusive societies',
                'color' => '#00689D',
                'icon_url' => '/images/sdg/E_SDG_Icons-16.jpg',
            ],
            [
                'goal_number' => 17,
                'title' => 'Partnerships for the Goals',
                'description' => 'Strengthen the means of implementation',
                'color' => '#19486A',
                'icon_url' => '/images/sdg/E_SDG_Icons-17.jpg',
            ],
        ];

        foreach ($sdgGoals as $goal) {
            SdgGoal::create($goal);
        }
    }
}
