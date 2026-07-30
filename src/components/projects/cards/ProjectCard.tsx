import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { ProjectEntry } from "@/types/project";

interface ProjectCardProps {
  project: ProjectEntry;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group bg-surface-container-lowest rounded-[16px] border border-outline-variant/30 hover:border-outline-variant transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md flex flex-col">
      <Link
        href={`/projects/${project.slug}`}
        className="block relative h-64 overflow-hidden"
      >
        <div className="absolute top-4 left-4 z-10 glass-panel px-3 py-1 rounded-full bg-primary/90 text-on-primary text-label-sm font-bold shadow-sm">
          {project.category}
        </div>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-headline-sm font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="text-body-md text-on-surface-variant mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-col gap-2 pt-4 border-t border-outline-variant/30">
          <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-label-sm text-on-surface-variant">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{project.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
