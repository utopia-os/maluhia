import { Turtle } from '@ttanton/animated-turtle';

interface AnimatedTurtleProps {
  className?: string;
  size?: number; // Size in pixels for the container
}

export function AnimatedTurtle({ className = '', size = 128 }: AnimatedTurtleProps) {
  // Scale factor to maintain aspect ratio from original 720x520
  const scale = size / 720;
  const containerHeight = 520 * scale;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${containerHeight}px`,
      }}
    >
      <Turtle
        scale={scale}
        images={{
          body: `${import.meta.env.BASE_URL}turtle_body.webp`,
          head: `${import.meta.env.BASE_URL}turtle_head.webp`,
          flipperLeft: `${import.meta.env.BASE_URL}turtle_flipper_left.webp`,
          flipperRight: `${import.meta.env.BASE_URL}turtle_flipper_right.webp`,
          flipperBack: `${import.meta.env.BASE_URL}turtle_flipper_back.webp`,
        }}
      />
    </div>
  );
}
