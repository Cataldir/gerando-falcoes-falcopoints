"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import clsx from 'clsx';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Campaign } from '@/types/campaign';
import { Button } from '@/components/atoms/Button';
import { formatCurrency } from '@/utilities/formatters';

interface CampaignSliderProps {
  campaigns: Campaign[];
}

interface ArrowProps {
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const PrevArrow = ({ className, onClick, style }: ArrowProps) => (
  <Button
    type="button"
    variant="ghost"
    onClick={onClick}
    aria-label="Campanha anterior"
    style={style}
    className={clsx(
      'absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-lg transition hover:bg-white',
      className
    )}
  >
    <FiChevronLeft className="h-6 w-6" aria-hidden="true" />
  </Button>
);

const NextArrow = ({ className, onClick, style }: ArrowProps) => (
  <Button
    type="button"
    variant="ghost"
    onClick={onClick}
    aria-label="Próxima campanha"
    style={style}
    className={clsx(
      'absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-primary shadow-lg transition hover:bg-white',
      className
    )}
  >
    <FiChevronRight className="h-6 w-6" aria-hidden="true" />
  </Button>
);

export const CampaignSlider = ({ campaigns }: CampaignSliderProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => sliderRef.current?.slickGoTo(index);

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => setCurrent(next),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  } satisfies Slider['props'];

  return (
    <section className="relative overflow-hidden rounded-3xl bg-white shadow-card">
      <Slider ref={sliderRef} {...settings} className="h-full">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="relative h-64 w-full overflow-hidden rounded-3xl">
            <Image src={campaign.imageUrl} alt={campaign.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-button text-2xl font-bold">{campaign.name}</h3>
              <p className="mt-2 text-sm text-white/80">{campaign.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                <span className="rounded-full bg-accent-orange/80 px-4 py-2 font-semibold">
                  Meta: {formatCurrency(campaign.goal)}
                </span>
                <span className="rounded-full bg-accent-green/70 px-4 py-2 font-semibold">
                  Arrecadado: {formatCurrency(campaign.raised)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {campaigns.map((campaign, index) => (
          <button
            key={campaign.id}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 w-10 rounded-full transition ${
              index === current ? 'bg-primary' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Ir para campanha ${campaign.name}`}
          />
        ))}
      </div>
    </section>
  );
};
