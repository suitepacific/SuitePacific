"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowLeftRight } from "lucide-react";
import { EnvironmentBadge } from "./EnvironmentBadge";

type EnvOption = { id: string; name: string; type: string };

export function EnvSelector({
  envs,
  leftEnvId,
  rightEnvId,
  scriptId,
  paramName = "script",
}: {
  envs: EnvOption[];
  leftEnvId: string;
  rightEnvId: string;
  scriptId: string;
  paramName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [leftId, setLeftId] = useState(leftEnvId);
  const [rightId, setRightId] = useState(rightEnvId);

  function update(left: string, right: string) {
    setLeftId(left);
    setRightId(right);
    const tab = searchParams.get("tab");
    const tabPart = tab ? `&tab=${encodeURIComponent(tab)}` : "";
    router.push(
      `${pathname}?left=${encodeURIComponent(left)}&right=${encodeURIComponent(right)}&${paramName}=${encodeURIComponent(scriptId)}${tabPart}`
    );
  }

  const leftEnv = envs.find((e) => e.id === leftId);
  const rightEnv = envs.find((e) => e.id === rightId);

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-brand-100 w-fit">
      <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 bg-brand-50">
        {leftEnv && <EnvironmentBadge type={leftEnv.type} />}
        <select
          value={leftId}
          onChange={(e) => update(e.target.value, rightId)}
          className="text-xs font-medium text-brand-700 bg-transparent border-none outline-none cursor-pointer"
        >
          {envs.map((env) => (
            <option key={env.id} value={env.id} disabled={env.id === rightId}>
              {env.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => update(rightId, leftId)}
        title="Swap sides"
        className="flex items-center justify-center h-6 w-6 rounded-md text-brand-300 hover:text-accent hover:bg-accent/10 transition-colors"
      >
        <ArrowLeftRight className="h-3 w-3" />
      </button>

      <div className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 bg-brand-50">
        {rightEnv && <EnvironmentBadge type={rightEnv.type} />}
        <select
          value={rightId}
          onChange={(e) => update(leftId, e.target.value)}
          className="text-xs font-medium text-brand-700 bg-transparent border-none outline-none cursor-pointer"
        >
          {envs.map((env) => (
            <option key={env.id} value={env.id} disabled={env.id === leftId}>
              {env.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
