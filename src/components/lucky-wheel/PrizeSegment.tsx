import React from "react";

interface PrizeSegmentProps {
  index: number;
  totalSegments: number;
  name: string;
  color: string;
  image?: string;
  radius?: number;
}

export function PrizeSegment({
  index,
  totalSegments,
  name,
  color,
  image,
  radius = 200,
}: PrizeSegmentProps) {
  const segmentAngle = 360 / totalSegments;
  // Offset by -90deg so the first segment starts from the top
  const startAngle = index * segmentAngle - 90 - segmentAngle / 2;
  const endAngle = startAngle + segmentAngle;

  const startRad = (Math.PI * startAngle) / 180;
  const endRad = (Math.PI * endAngle) / 180;

  const x1 = +(radius + radius * Math.cos(startRad)).toFixed(4);
  const y1 = +(radius + radius * Math.sin(startRad)).toFixed(4);
  const x2 = +(radius + radius * Math.cos(endRad)).toFixed(4);
  const y2 = +(radius + radius * Math.sin(endRad)).toFixed(4);

  const largeArcFlag = segmentAngle > 180 ? 1 : 0;

  const pathData = [
    `M ${radius} ${radius}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    "Z",
  ].join(" ");

  // Calculate base angle
  const textAngle = startAngle + segmentAngle / 2;
  const textRad = (Math.PI * textAngle) / 180;

  // Image position (closer to the edge)
  const imageRadius = radius * 0.8; 
  const imageX = +(radius + imageRadius * Math.cos(textRad)).toFixed(4);
  const imageY = +(radius + imageRadius * Math.sin(textRad)).toFixed(4);
  const imageSize = 64; // Adjusted to fit

  // Text position 
  const textRadius = image ? radius * 0.54 : radius * 0.65;
  const textX = +(radius + textRadius * Math.cos(textRad)).toFixed(4);
  const textY = +(radius + textRadius * Math.sin(textRad)).toFixed(4);

  // Determine text color based on background color
  const textColor = color === "#FFD700" ? "#b30000" : "#ffffff";

  // Helper to chunk long text radially
  const formatName = (text: string) => {
    const match = text.match(/^(.+?)\s*\((.+)\)\s*$/);
    if (match) {
      const main = match[1].trim();
      // If there is an image, the subtext takes too much radial space and overlaps.
      // So we just show the main prize name (e.g. "Giải nhất") since the image shows the prize.
      if (image) {
        return [{ text: main, isMain: true }];
      }
      
      const sub = match[2].trim();
      const subWords = sub.split(" ");
      let subLines = [];
      let currentLine = "";
      for (const w of subWords) {
        if ((currentLine + " " + w).trim().length > 25 && currentLine) {
          subLines.push(currentLine.trim());
          currentLine = w;
        } else {
          currentLine += (currentLine ? " " : "") + w;
        }
      }
      if (currentLine) subLines.push(currentLine.trim());
      
      return [
        { text: main, isMain: true },
        ...subLines.map((line, idx) => ({ text: (idx === 0 ? "(" : "") + line + (idx === subLines.length - 1 ? ")" : ""), isMain: false }))
      ];
    }
    
    // Default chunking if no parenthesis
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";
    for (const w of words) {
      if ((currentLine + " " + w).trim().length > 18 && currentLine) {
        lines.push({ text: currentLine.trim(), isMain: true });
        currentLine = w;
      } else {
        currentLine += (currentLine ? " " : "") + w;
      }
    }
    if (currentLine) lines.push({ text: currentLine.trim(), isMain: true });
    
    // Limit to 2 lines max if it's too long to prevent center overlap
    if (lines.length > 2) {
       lines = lines.slice(0, 2);
       lines[1].text += "...";
    }
    
    return lines;
  };

  const textLines = formatName(name);

  // To make text readable (not upside down on the left side)
  let rotationAngle = textAngle;
  if (rotationAngle > 90 || rotationAngle < -90) {
    rotationAngle += 180;
  }

  return (
    <g>
      <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="2" />
      {image && (
        <image
          href={image}
          x={imageX - imageSize / 2}
          y={imageY - imageSize / 2}
          width={imageSize}
          height={imageSize}
          transform={`rotate(${textAngle + 90}, ${imageX}, ${imageY})`}
        />
      )}
      <text
        x={textX}
        y={textY} 
        fill={textColor}
        textAnchor="middle"
        alignmentBaseline="middle"
        transform={`rotate(${rotationAngle}, ${textX}, ${textY})`}
      >
        {textLines.map((line, i) => (
          <tspan 
            x={textX} 
            dy={i === 0 ? `-${(textLines.length - 1) * 0.6}em` : "1.2em"} 
            key={i}
            fontSize={line.isMain ? "18" : "12"}
            fontWeight={line.isMain ? "900" : "bold"}
          >
            {line.text}
          </tspan>
        ))}
      </text>
    </g>
  );
}
